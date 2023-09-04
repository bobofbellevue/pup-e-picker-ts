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

  // Adds a dog to state, avoiding a refetch to database
  createDogState(newDog: Dog) {
    const newAllDogs: Dog[] = [...this.state.allDogs];
    newAllDogs.push(newDog);
    this.setState({ allDogs: newAllDogs });
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={this.state.activeTab}
          setActiveTab={(tab: TAB) => this.setState({ activeTab: tab === this.state.activeTab ? "NONE" : tab })}
          favoriteCount={this.state.allDogs.reduce((total, dog: Dog) => total + (dog.isFavorite ? 1 : 0), 0)}
          unfavoriteCount={this.state.allDogs.reduce((total, dog: Dog) => total + (dog.isFavorite ? 0 : 1), 0)}
          isLoading={this.state.isLoading}
        >
          <ClassDogs
            allDogs={this.state.allDogs}
            setAllDogs={(dogs: Dog[]) => this.setState({ allDogs: dogs } )}
            activeTab={this.state.activeTab}
            setIsLoading={(status: boolean) => this.setState({ isLoading: status } )}
          />
          <ClassCreateDogForm
            activeTab={this.state.activeTab}
            createDogState={(dog: Dog) => this.createDogState(dog)}
            setIsLoading={(status: boolean) => this.setState({ isLoading: status } )}
          />
        </ClassSection>
      </div>
    );
  }
}
