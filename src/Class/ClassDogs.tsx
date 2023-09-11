import { DogCard } from "../Shared/DogCard";
import { Component, CSSProperties } from "react";
import { Dog, TAB, TabValues } from "../types";

type ClassDogProps = {
  activeTab: TAB;
  allDogs: Dog[];
  deleteDog(dog: Dog): void;
  flipDogFavoriteStatus(dog: Dog): void;
};

export class ClassDogs extends Component<ClassDogProps> {
  shouldDisplayDog(dog: Dog) {
    switch (this.props.activeTab) {
      case TabValues.FAVORITE:
        return dog.isFavorite;
      case TabValues.UNFAVORITE:
        return !dog.isFavorite;
      case TabValues.NONE:
        return true;
    }
    return false;
  }

  render() {
    const { allDogs, activeTab, deleteDog, flipDogFavoriteStatus } = this.props;
    const divStyles: CSSProperties =
      activeTab === TabValues.CREATE_DOG ? { display: "none" } : {};
    const displayDogs = allDogs.filter((dog) => this.shouldDisplayDog(dog));

    return (
      <div className="content-container" style={divStyles}>
        {displayDogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => deleteDog(dog)}
            onHeartClick={() => flipDogFavoriteStatus(dog)}
            onEmptyHeartClick={() => flipDogFavoriteStatus(dog)}
            isLoading={false}
          />
        ))}
      </div>
    );
  }
}
