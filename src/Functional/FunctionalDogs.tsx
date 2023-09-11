import { DogCard } from "../Shared/DogCard";
import { Dog, TAB, TabValues } from "../types";

type FunctionalDogProps = {
  allDogs: Dog[];
  activeTab: TAB;
  isLoading: boolean;
  deleteDog(dog: Dog): void;
  flipDogFavoriteStatus(dog: Dog): void;
};

export const FunctionalDogs = (props: FunctionalDogProps) => {
  const { activeTab, allDogs, isLoading, deleteDog, flipDogFavoriteStatus } =
    props;

  const shouldHideContainer =
    activeTab === TabValues.CREATE_DOG ? { display: "none" } : {};

  const shouldDisplayDog = (dog: Dog) => {
    switch (activeTab) {
      case TabValues.FAVORITE:
        return dog.isFavorite;
      case TabValues.UNFAVORITE:
        return !dog.isFavorite;
      case TabValues.NONE:
        return true;
    }
    return false;
  };

  const displayDogs = allDogs.filter((dog) => shouldDisplayDog(dog));

  return (
    <div className="content-container" style={shouldHideContainer}>
      {displayDogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => deleteDog(dog)}
          onHeartClick={() => flipDogFavoriteStatus(dog)}
          onEmptyHeartClick={() => flipDogFavoriteStatus(dog)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
