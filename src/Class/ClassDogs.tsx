import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog, TAB } from "../types";

type ClassDogProps = {
  activeTab: TAB;
  setIsLoading(status: boolean): void;
  allDogs: Dog[];
  setAllDogs(dogs: Dog[]): void;
};

export class ClassDogs extends Component<ClassDogProps> {
  refetchData = async () => {
    const { setAllDogs, setIsLoading } = this.props;
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  componentDidMount(): void {
    this.refetchData();
  }

  flipDogFavoriteStatus = (originalDog: Dog) => {
    const { allDogs, setAllDogs, setIsLoading } = this.props;
    setIsLoading(true);
    const newDog = originalDog;
    newDog.isFavorite = !originalDog.isFavorite;
    Requests.updateDog(newDog)
      .then(() => {
        // maintain the list of dogs in state in parallel with the database to avoid a refetch
        const index = allDogs.findIndex(
          (findDog) => findDog.id === originalDog.id
        );
        if (index >= 0) {
          const newAllDogs = [...allDogs];
          newAllDogs[index].isFavorite = newDog.isFavorite;
          setAllDogs(newAllDogs);
        }
      })
      .finally(() => setIsLoading(false))
      .catch((err) => console.error(err));
  };

  deleteDog = (targetDog: Dog) => {
    const { allDogs, setAllDogs, setIsLoading } = this.props;
    setIsLoading(true);
    Requests.deleteDog(targetDog)
      .then(() => {
        // maintain the list of dogs in state in parallel with the database to avoid a refetch
        const index = allDogs.findIndex(
          (findDog) => findDog.id === targetDog.id
        );
        if (index >= 0) {
          const newAllDogs = [...allDogs];
          newAllDogs.splice(index, 1);
          setAllDogs(newAllDogs);
        }
      })
      .finally(() => setIsLoading(false))
      .catch((err) => console.error(err));
  };

  shouldDisplayDog(dog: Dog) {
    const { activeTab } = this.props;
    return (
      (activeTab != "FAVORITE" && activeTab != "UNFAVORITE") ||
      (dog.isFavorite && activeTab === "FAVORITE") ||
      (!dog.isFavorite && activeTab === "UNFAVORITE")
    );
  }

  render() {
    const { allDogs, activeTab } = this.props;
    const shouldHideContainer =
      activeTab === "CREATE_DOG" ? { display: "none" } : {};

    return (
      <div className="content-container" style={shouldHideContainer}>
        {allDogs.map((dog) =>
          this.shouldDisplayDog(dog) ? (
            <DogCard
              dog={dog}
              key={dog.id}
              onTrashIconClick={() => this.deleteDog(dog)}
              onHeartClick={() => this.flipDogFavoriteStatus(dog)}
              onEmptyHeartClick={() => this.flipDogFavoriteStatus(dog)}
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
