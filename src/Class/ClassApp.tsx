import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, TAB, TabValues } from "../types";
import { Requests } from "../api";

type ClassAppType = {
  allDogs: Dog[];
  activeTab: TAB;
  isLoading: boolean;
};

export class ClassApp extends Component {
  state: ClassAppType = {
    allDogs: [],
    activeTab: TabValues.NONE,
    isLoading: false,
  };

  async refetchData() {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => {
        this.setState({ allDogs: dogs });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount(): void {
    this.refetchData();
  }

  flipDogFavoriteStatus(targetDog: Dog) {
    const { allDogs } = this.state;
    this.setState({ isLoading: true });
    const newDog = targetDog;
    newDog.isFavorite = !targetDog.isFavorite;
    Requests.updateDog(newDog)
      .then(() => {
        const newAllDogs: Dog[] = allDogs.map((findDog) => {
          return findDog;
        });
        this.setState({ allDogs: newAllDogs });
      })
      .finally(() => this.setState({ isLoading: false }))
      .catch((err) => console.error(err));
  }

  deleteDog(targetDog: Dog) {
    const { allDogs } = this.state;
    this.setState({ isLoading: true });
    Requests.deleteDog(targetDog)
      .then(() => {
        const allOtherDogs = allDogs.filter(
          (findDog) => findDog.id !== targetDog.id
        );
        this.setState({ allDogs: allOtherDogs });
      })
      .finally(() => this.setState({ isLoading: false }))
      .catch((err) => console.error(err));
  }

  createDogState(newDog: Dog) {
    const newAllDogs: Dog[] = [...this.state.allDogs];
    newAllDogs.push(newDog);
    this.setState({ allDogs: newAllDogs });
  }

  render() {
    const { allDogs, activeTab, isLoading } = this.state;
    const favoriteCount = allDogs.reduce(
      (total, dog: Dog) => total + (dog.isFavorite ? 1 : 0),
      0
    );
    const unfavoriteCount = allDogs.length - favoriteCount;
    const setActiveTab = (tab: TAB) =>
      this.setState({ activeTab: tab === activeTab ? TabValues.NONE : tab });
    const setIsLoading = (status: boolean) => this.setState({ status });

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
            activeTab={activeTab}
            allDogs={allDogs}
            deleteDog={(dog) => this.deleteDog(dog)}
            flipDogFavoriteStatus={(dog) => this.flipDogFavoriteStatus(dog)}
          />
          <ClassCreateDogForm
            activeTab={activeTab}
            createDogState={(dog) => this.createDogState(dog)}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </ClassSection>
      </div>
    );
  }
}
