import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog, TAB } from "../types";

type FunctionalDogProps = {
  allDogs: Dog[];
  setAllDogs(dogs: Dog[]): void;
  activeTab: TAB;
  isLoading: boolean;
  setIsLoading(status: boolean): void;
};

export const FunctionalDogs = (props: FunctionalDogProps) => {
  const { activeTab, allDogs, setAllDogs, isLoading, setIsLoading } = props;

  const flipDogFavoriteStatus = (workingDog: Dog) => {
    setIsLoading(true);
    const newDog = workingDog;
    newDog.isFavorite = !workingDog.isFavorite;
    Requests.updateDog(newDog)
      .then(() => {
        const index = allDogs.findIndex(
          (findDog) => findDog.id === workingDog.id
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

  const deleteDog = (workingDog: Dog) => {
    setIsLoading(true);
    Requests.deleteDog(workingDog)
      .then(() => {
        const index = allDogs.findIndex(
          (findDog) => findDog.id === workingDog.id
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
  return (
    <div
      className="content-container"
      style={activeTab === "CREATEDOG" ? { display: "none" } : {}}
    >
      {allDogs.map((dog) =>
        (activeTab != "FAVORITE" && activeTab != "UNFAVORITE") ||
        (dog.isFavorite && activeTab === "FAVORITE") ||
        (!dog.isFavorite && activeTab === "UNFAVORITE") ? (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => deleteDog(dog)}
            onHeartClick={() => flipDogFavoriteStatus(dog)}
            onEmptyHeartClick={() => flipDogFavoriteStatus(dog)}
            isLoading={isLoading}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
};
