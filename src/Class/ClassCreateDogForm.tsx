import { Component, ChangeEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, TAB } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

interface DogFormProps {
  activeTab: TAB;
  createDogState(dog: Dog): void;
  setIsLoading(status: boolean): void;
  isLoading: boolean;
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
    const { activeTab, isLoading } = this.props;
    const { dog } = this.state;
    const shouldHideForm = activeTab != "CREATE_DOG" ? { display: "none" } : {};
    const onChange = (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
      property: string
    ) => this.setState({ dog: { ...dog, [property]: e.target.value } });

    return (
      <form
        action=""
        id="create-dog-form"
        style={shouldHideForm}
        onSubmit={(e) => this.onSubmitDog(e)}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => onChange(e, "name")}
          value={dog.name}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => onChange(e, "description")}
          value={dog.description}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => onChange(e, "image")}
          value={dog.image}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={!dog.name || isLoading} />
      </form>
    );
  }
}
