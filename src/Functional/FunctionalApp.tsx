import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TAB, CreateDogStateParams } from "../types";
import { Requests } from "../api";

// When creating, deleting, and favoriting/unfavoriting dogs, we update the list of dogs in state in parallel with the databse to avoid a refetch to the database
function createDogState(newDog: Dog, params: CreateDogStateParams) {
  const newAllDogs: Dog[] = [...params.allDogs];
  newAllDogs.push(newDog);
  params.setAllDogs(newAllDogs);
  params.setFavoriteCount(
    newAllDogs.reduce((total, dog) => total + (dog.isFavorite ? 1 : 0), 0)
  );
  params.setUnfavoriteCount(
    newAllDogs.reduce((total, dog) => total + (dog.isFavorite ? 0 : 1), 0)
  );
}

interface refecthDataParams {
  setIsLoading(status: boolean): void;
  setAllDogs(dogs: Dog[]): void;
  allDogs: Dog[];
  setFavoriteCount(count: number): void;
  setUnfavoriteCount(count: number): void;
}

const refetchData = async (params: refecthDataParams) => {
  params.setIsLoading(true);
  return Requests.getAllDogs()
    .then((dogs: Dog[]) => {
      params.setAllDogs(dogs);
      params.setFavoriteCount(
        dogs.reduce((total, dog) => total + (dog.isFavorite ? 1 : 0), 0)
      );
      params.setUnfavoriteCount(
        dogs.reduce((total, dog) => total + (dog.isFavorite ? 0 : 1), 0)
      );
    })
    .finally(() => {
      params.setIsLoading(false);
    });
};

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState(TAB.none);
  const [isLoading, setIsLoading] = useState(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [favoriteCount, setFavoriteCount] = useState(-1);
  const [unfavoriteCount, setUnfavoriteCount] = useState(-1);

  useEffect(() => {
    refetchData({
      setIsLoading: (status) => setIsLoading(status),
      setAllDogs: (dogs) => setAllDogs(dogs),
      allDogs: allDogs,
      setFavoriteCount: (count) => setFavoriteCount(count),
      setUnfavoriteCount: (count) => setUnfavoriteCount(count),
    });
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={(tab: TAB) =>
          setActiveTab(tab === activeTab ? TAB.none : tab)
        }
        favoriteCount={favoriteCount}
        unfavoriteCount={unfavoriteCount}
        isLoading={isLoading}
      >
        <FunctionalDogs
          allDogs={allDogs}
          setAllDogs={(dogs: Dog[]) => setAllDogs(dogs)}
          activeTab={activeTab}
          isLoading={isLoading}
          setIsLoading={(state: boolean) => setIsLoading(state)}
          setFavoriteCount={(count: number) => setFavoriteCount(count)}
          setUnfavoriteCount={(count: number) => setUnfavoriteCount(count)}
        />
        <FunctionalCreateDogForm
          activeTab={activeTab}
          allDogs={allDogs}
          setAllDogs={(dogs: Dog[]) => setAllDogs(dogs)}
          setFavoriteCount={(count: number) => setFavoriteCount(count)}
          setUnfavoriteCount={(count: number) => setUnfavoriteCount(count)}
          createDogState={(dog, params) => createDogState(dog, params)}
        />
      </FunctionalSection>
    </div>
  );
}
