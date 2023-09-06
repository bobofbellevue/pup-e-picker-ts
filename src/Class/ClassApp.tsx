import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, TAB } from "../types";

type ClassAppType = {
  allDogs: Dog[];
  activeTab: TAB;
  isLoading: boolean;
};

export class ClassApp extends Component {
  state: ClassAppType = {
    allDogs: [],
    activeTab: "NONE",
    isLoading: false,
  };

  render() {
    const { allDogs, activeTab, isLoading } = this.state;
    const favoriteCount = allDogs.reduce(
      (total, dog: Dog) => total + (dog.isFavorite ? 1 : 0),
      0
    );
    const unfavoriteCount = allDogs.length - favoriteCount;
    const setActiveTab = (tab: TAB) =>
      this.setState({ activeTab: tab === activeTab ? "NONE" : tab });
    const setAllDogs = (dogs: Dog[]) => this.setState({ allDogs: dogs });
    const setIsLoading = (status: boolean) =>
      this.setState({ isLoading: status });

    // Adds a dog to state, avoiding a refetch to database
    const createDogState = (newDog: Dog) => {
      const newAllDogs: Dog[] = [...allDogs];
      newAllDogs.push(newDog);
      this.setState({ allDogs: newAllDogs });
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          favoriteCount={favoriteCount}
          unfavoriteCount={unfavoriteCount}
          isLoading={isLoading}
        >
          <ClassDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            activeTab={activeTab}
            setIsLoading={setIsLoading}
          />
          <ClassCreateDogForm
            activeTab={activeTab}
            createDogState={createDogState}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </ClassSection>
      </div>
    );
  }
}
