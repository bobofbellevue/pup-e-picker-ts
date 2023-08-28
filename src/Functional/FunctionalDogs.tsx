import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog, TAB } from "../types";

// QUESTION TO REVIEWER:
// Type or interface?  They seem to work the same for this purpose.
type FunctionalDogProps = {
  allDogs: Dog[];
  setAllDogs(dogs: Dog[]): void;
  activeTab: TAB;
  isLoading: boolean;
  setIsLoading(status: boolean): void;
  setFavoriteCount(count: number): void;
  setUnfavoriteCount(count: number): void;
};

const flipDogFavoriteStatus = (workingDog: Dog, props: FunctionalDogProps) => {
  const newDog = workingDog;
  newDog.isFavorite = !workingDog.isFavorite;
  Requests.updateDog(newDog);
  const index = props.allDogs.findIndex(
    (findDog) => findDog.id === workingDog.id
  );
  if (index >= 0) {
    const newAllDogs = [...props.allDogs];
    newAllDogs[index].isFavorite = newDog.isFavorite;
    props.setAllDogs(newAllDogs);
    props.setFavoriteCount(
      newAllDogs.reduce((total, dog) => total + (dog.isFavorite ? 1 : 0), 0)
    );
    props.setUnfavoriteCount(
      newAllDogs.reduce((total, dog) => total + (dog.isFavorite ? 0 : 1), 0)
    );
  }
};

const deleteDog = (workingDog: Dog, props: FunctionalDogProps) => {
  Requests.deleteDog(workingDog);
  const index = props.allDogs.findIndex(
    (findDog) => findDog.id === workingDog.id
  );
  if (index >= 0) {
    const newAllDogs = [...props.allDogs];
    newAllDogs.splice(index, 1);
    props.setAllDogs(newAllDogs);
    props.setFavoriteCount(
      newAllDogs.reduce((total, dog) => total + (dog.isFavorite ? 1 : 0), 0)
    );
    props.setUnfavoriteCount(
      newAllDogs.reduce((total, dog) => total + (dog.isFavorite ? 0 : 1), 0)
    );
  }
};

export const FunctionalDogs = (props: FunctionalDogProps) => {
  return (
    <div
      className="content-container"
      style={props.activeTab === TAB.createdog ? { display: "none" } : {}}
    >
      {props.allDogs.map((dog) =>
        (props.activeTab != TAB.favorite &&
          props.activeTab != TAB.unfavorite) ||
        (dog.isFavorite && props.activeTab === TAB.favorite) ||
        (!dog.isFavorite && props.activeTab === TAB.unfavorite) ? (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog, props);
            }}
            onHeartClick={() => {
              flipDogFavoriteStatus(dog, props);
            }}
            onEmptyHeartClick={() => {
              flipDogFavoriteStatus(dog, props);
            }}
            isLoading={props.isLoading}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
};
