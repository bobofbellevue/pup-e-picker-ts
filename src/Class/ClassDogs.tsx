import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog, TAB } from "../types";

type ClassDogProps = {
  setFavoriteCounts(favorites: number, unfavorites: number): void;
  activeTab: TAB;
  setLoadingState(status: boolean): void;
  allDogs: Dog[];
  setAllDogsState(dogs: Dog[]): void;
};

type ClassDogState = {
  isLoading: boolean;
};

export class ClassDogs extends Component<ClassDogProps, ClassDogState> {
  state: ClassDogState = {
    isLoading: false,
  };

  refetchData = async () => {
    this.setState({ isLoading: true });
    this.props.setLoadingState(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        this.props.setAllDogsState(dogs);
      })
      .finally(() => {
        this.setState({ isLoading: false });
        this.props.setLoadingState(false);
        this.setFavoriteCounts(this.props.allDogs);
      });
  };

  componentDidMount(): void {
    this.refetchData();
  }

  flipDogFavoriteStatus(originalDog: Dog): void {
    const newDog = originalDog;
    newDog.isFavorite = !originalDog.isFavorite;
    Requests.updateDog(newDog);
    const index = this.props.allDogs.findIndex(
      (findDog) => findDog.id === originalDog.id
    );
    if (index >= 0) {
      const newAllDogs = [...this.props.allDogs];
      newAllDogs[index].isFavorite = newDog.isFavorite;
      this.props.setAllDogsState(newAllDogs);
      this.setFavoriteCounts(newAllDogs);
    }
  }

  setFavoriteCounts(dogArray: Dog[]) {
    this.props.setFavoriteCounts(
      dogArray.reduce((total, dog) => total + (dog.isFavorite ? 1 : 0), 0),
      dogArray.reduce((total, dog) => total + (dog.isFavorite ? 0 : 1), 0)
    );
  }

  // Note: we maintain the list of dogs in state in parallel with the database to avoid a refetch
  deleteDog(targetDog: Dog): void {
    Requests.deleteDog(targetDog);
    const index = this.props.allDogs.findIndex(
      (findDog) => findDog.id === targetDog.id
    );
    if (index >= 0) {
      const newAllDogs = [...this.props.allDogs];
      newAllDogs.splice(index, 1);
      this.props.setAllDogsState(newAllDogs);
      this.setFavoriteCounts(newAllDogs);
    }
  }

  render() {
    return (
      <div
        className="content-container"
        style={
          this.props.activeTab === TAB.createdog ? { display: "none" } : {}
        }
      >
        {this.props.allDogs.map((dog) =>
          (this.props.activeTab != TAB.favorite &&
            this.props.activeTab != TAB.unfavorite) ||
          (dog.isFavorite && this.props.activeTab === TAB.favorite) ||
          (!dog.isFavorite && this.props.activeTab === TAB.unfavorite) ? (
            <DogCard
              dog={dog}
              key={dog.id}
              onTrashIconClick={() => {
                this.deleteDog(dog);
              }}
              onHeartClick={() => {
                this.flipDogFavoriteStatus(dog);
              }}
              onEmptyHeartClick={() => {
                this.flipDogFavoriteStatus(dog);
              }}
              isLoading={false}
            />
          ) : (
            ""
          )
        )}
      </div>
    );
  }
}
