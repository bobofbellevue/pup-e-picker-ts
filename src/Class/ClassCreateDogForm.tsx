import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, TAB } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

interface DogFormProps {
  activeTab: TAB;
  createDogState(dog: Dog): void;
}

export class ClassCreateDogForm extends Component<DogFormProps> {
  state = {
    dog: this.clearDog(),
  };

  onSubmitDog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newDog = this.state.dog;
    Requests.postDog(this.state.dog)
      .then((data) => {
        newDog.id = data.id; // get the new dog ID back from POST
      })
      .then(() => {
        this.props.createDogState(newDog); // adds new dog to state over in sibling class: ClassDogs via ref in parent class, avoiding refetch from database
        toast.success("Dog Created");
      })
      .finally(() => {
        this.setState({
          dog: this.clearDog(),
        });
      });
  }

  clearDog() {
    return {
      name: "",
      // image: grabs image name off of first entry of dogPictures as default image
      image: Object.entries(dogPictures)
        .slice(0, 1)
        .map(([, pictureValue]) => pictureValue)[0],
      description: "",
      isFavorite: false,
      id: "",
    };
  }

  onChangeDogName(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ dog: { ...this.state.dog, name: e.target.value } });
  }

  onChangeDogDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ dog: { ...this.state.dog, description: e.target.value } });
  }

  onChangeDogPicture(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ dog: { ...this.state.dog, image: e.target.value } });
  }

  isEmptyDog() {
    return (!this.state.dog.name);
  }

  render() {
    return (
      <form
        action=""
        id="create-dog-form"
        style={this.props.activeTab != TAB.createdog ? { display: "none" } : {}}
        onSubmit={(e) => this.onSubmitDog(e)}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => this.onChangeDogName(e)}
          value={this.state.dog.name}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => this.onChangeDogDescription(e)}
          value={this.state.dog.description}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => this.onChangeDogPicture(e)}
          value={this.state.dog.image}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={this.isEmptyDog()} />
      </form>
    );
  }
}
