import { useState, ChangeEvent, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, TAB, TabValues } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

const makeEmptyDog = () => {
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
};

interface DogFormProps {
  activeTab: TAB;
  createDogState(dog: Dog): void;
  setIsLoading(status: boolean): void;
  isLoading: boolean;
}

export const FunctionalCreateDogForm = (props: DogFormProps) => {
  const [dog, setDog] = useState(makeEmptyDog());

  const onSubmitDog = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setIsLoading(true);
    const newDog = dog;
    Requests.postDog(dog)
      .then((data) => {
        // get the new dog ID back from POST
        newDog.id = data.id;
      })
      .then(() => {
        props.createDogState(newDog);
        toast.success("Dog Created");
      })
      .finally(() => {
        setDog(makeEmptyDog());
        props.setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const shouldHideForm =
    props.activeTab != TabValues.CREATE_DOG ? { display: "none" } : {};

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    property: string
  ) => {
    setDog({ ...dog, [property]: e.target.value });
  };

  return (
    <form
      action=""
      id="create-dog-form"
      style={shouldHideForm}
      onSubmit={(e) => onSubmitDog(e)}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        onChange={(e) => onChange(e, "name")}
        value={dog.name}
        disabled={props.isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        cols={80}
        rows={10}
        disabled={props.isLoading}
        onChange={(e) => onChange(e, "description")}
        value={dog.description}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => onChange(e, "image")}
        value={dog.image}
        disabled={props.isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input
        type="submit"
        value="submit"
        disabled={!dog.name || props.isLoading}
      />
    </form>
  );
};
