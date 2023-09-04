import { useState, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, TAB } from "../types";
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

  return (
    <form
      action=""
      id="create-dog-form"
      style={props.activeTab != "CREATEDOG" ? { display: "none" } : {}}
      onSubmit={(e) => onSubmitDog(e)}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        onChange={(e) => {
          setDog({ ...dog, name: e.target.value });
        }}
        value={dog.name}
        disabled={false}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        onChange={(e) => {
          setDog({ ...dog, description: e.target.value });
        }}
        value={dog.description}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setDog({ ...dog, image: e.target.value });
        }}
        value={dog.image}
        disabled={false}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" disabled={false} />
    </form>
  );
};
