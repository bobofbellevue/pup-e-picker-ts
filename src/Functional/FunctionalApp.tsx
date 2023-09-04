import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TAB } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState<TAB>("NONE");
  const [isLoading, setIsLoading] = useState(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

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

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={(tab: TAB) =>
          setActiveTab(tab === activeTab ? "NONE" : tab)
        }
        favoriteCount={allDogs.reduce(
          (total: number, dog: Dog) => total + (dog.isFavorite ? 1 : 0),
          0
        )}
        unfavoriteCount={allDogs.reduce(
          (total: number, dog: Dog) => total + (dog.isFavorite ? 0 : 1),
          0
        )}
        isLoading={isLoading}
      >
        <FunctionalDogs
          allDogs={allDogs}
          setAllDogs={(dogs: Dog[]) => setAllDogs(dogs)}
          activeTab={activeTab}
          isLoading={isLoading}
          setIsLoading={(state: boolean) => setIsLoading(state)}
        />
        <FunctionalCreateDogForm
          activeTab={activeTab}
          createDogState={(dog) => createDogState(dog)}
          setIsLoading={(state: boolean) => setIsLoading(state)}
        />
      </FunctionalSection>
    </div>
  );
}
