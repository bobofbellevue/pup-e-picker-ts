import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TAB } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [activeTab, activeTabSetter] = useState<TAB>("NONE");
  const [isLoading, isLoadingSetter] = useState(false);
  const [allDogs, allDogsSetter] = useState<Dog[]>([]);

  const refetchData = async () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs: Dog[]) => {
        setAllDogs(dogs);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  // update the list of dogs in state in parallel with the database to avoid a refetch
  const createDogState = (newDog: Dog) => {
    const newAllDogs: Dog[] = [...allDogs];
    newAllDogs.push(newDog);
    setAllDogs(newAllDogs);
  };

  useEffect(() => {
    refetchData();
  }, []);

  const favoriteCount = allDogs.reduce(
    (total, dog: Dog) => total + (dog.isFavorite ? 1 : 0),
    0
  );
  const unfavoriteCount = allDogs.length - favoriteCount;
  const setActiveTab = (tab: TAB) =>
    activeTabSetter(tab === activeTab ? "NONE" : tab);
  const setAllDogs = (dogs: Dog[]) => allDogsSetter(dogs);
  const setIsLoading = (status: boolean) => isLoadingSetter(status);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoriteCount={favoriteCount}
        unfavoriteCount={unfavoriteCount}
        isLoading={isLoading}
      >
        <FunctionalDogs
          allDogs={allDogs}
          setAllDogs={setAllDogs}
          activeTab={activeTab}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <FunctionalCreateDogForm
          activeTab={activeTab}
          createDogState={createDogState}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </FunctionalSection>
    </div>
  );
}
