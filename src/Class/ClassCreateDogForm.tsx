import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, TAB } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

interface DogFormProps {
  activeTab: TAB;
  createDogState(dog: Dog): void;
  setIsLoading(status: boolean): void;
}

export class ClassCreateDogForm extends Component<DogFormProps> {
  state = {
    dog: this.makeEmptyDog(),
  };

  onSubmitDog(e: React.FormEvent<HTMLFormElement>) {
    const { createDogState, setIsLoading } = this.props;
    const { dog } = this.state;
    e.preventDefault();
    setIsLoading(true);
    const newDog = dog;
    Requests.postDog(dog)
      .then((data) => {
        // get the new dog ID back from POST
        newDog.id = data.id;
      })
      .then(() => {
        // adds new dog to state in parent class, avoiding refetch from database
        createDogState(newDog);
        toast.success("Dog Created");
      })
      .finally(() => {
        // clear the form
        this.setState({
          dog: this.makeEmptyDog(),
        });
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }

  makeEmptyDog() {
    return {
      name: "",
      // grabs image name off of first entry of dogPictures as default image
      image: Object.entries(dogPictures)
        .slice(0, 1)
        .map(([, pictureValue]) => pictureValue)[0],
      description: "",
      isFavorite: false,
      id: "",
    };
  }

  render() {
    const { activeTab } = this.props;
    const { dog } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        style={activeTab != "CREATEDOG" ? { display: "none" } : {}}
        onSubmit={(e) => this.onSubmitDog(e)}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => this.setState({ dog: { ...dog, name: e.target.value } })}
          value={dog.name}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) =>
            this.setState({
              dog: { ...dog, description: e.target.value },
            })
          }
          value={dog.description}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) =>
            this.setState({ dog: { ...dog, image: e.target.value } })
          }
          value={dog.image}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={!dog.name} />
      </form>
    );
  }
}
