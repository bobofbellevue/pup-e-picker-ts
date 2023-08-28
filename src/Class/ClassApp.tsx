import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, TAB } from "../types";

export class ClassApp extends Component {
  state = {
    allDogs: [],
    activeTab: TAB.none,
    favoriteCount: -1,
    unfavoriteCount: -1,
    isLoading: false,
  };

  setActiveTab(tab: TAB) {
    this.setState({ activeTab: tab === this.state.activeTab ? TAB.none : tab });
  }

  setFavoriteCounts(favoriteCount: number, unfavoriteCount: number) {
    this.setState({
      favoriteCount: favoriteCount,
      unfavoriteCount: unfavoriteCount,
    });
  }

  setLoadingState(status: boolean) {
    this.setState({ isLoading: status });
  }

  // Adds a dog to state, avoiding a refetch to database
  createDogState(newDog: Dog) {
    const newAllDogs: Dog[] = [...this.state.allDogs];
    newAllDogs.push(newDog);
    this.setState({ allDogs: newAllDogs });
    this.setFavoriteCounts(
      newAllDogs.reduce((total, dog) => total + (dog.isFavorite ? 1 : 0), 0),
      newAllDogs.reduce((total, dog) => total + (dog.isFavorite ? 0 : 1), 0)
    );
  }

  setAllDogsState(newAllDogs: Dog[]) {
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
          setActiveTab={(tab) => this.setActiveTab(tab)}
          favoriteCount={this.state.favoriteCount}
          unfavoriteCount={this.state.unfavoriteCount}
          isLoading={this.state.isLoading}
        >
          <ClassDogs
            allDogs={this.state.allDogs}
            setAllDogsState={(dogs) => this.setAllDogsState(dogs)}
            activeTab={this.state.activeTab}
            setFavoriteCounts={(a, b) => this.setFavoriteCounts(a, b)}
            setLoadingState={(state) => this.setLoadingState(state)}
          />
          <ClassCreateDogForm
            activeTab={this.state.activeTab}
            createDogState={(dog) => this.createDogState(dog)}
          />
        </ClassSection>
      </div>
    );
  }
}
