import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, TAB, CreateDogStateParams } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

interface SubmitDogParams {
  e: React.FormEvent<HTMLFormElement>;
  dog: Dog;
  createDogState(dog: Dog, params: CreateDogStateParams): void;
  setDog(dog: Dog): void;
  allDogs: Dog[];
  setAllDogs(dogs: Dog[]): void;
  setFavoriteCount(count: number): void;
  setUnfavoriteCount(count: number): void;
}

const onSubmitDog = (params: SubmitDogParams) => {
  params.e.preventDefault();
  const newDog = params.dog;
  Requests.postDog(params.dog)
    .then((data) => {
      newDog.id = data.id; // get the new dog ID back from POST
    })
    .then(() => {
      const cdsParams: CreateDogStateParams = {
        allDogs: params.allDogs,
        setAllDogs: params.setAllDogs,
        setFavoriteCount: params.setFavoriteCount,
        setUnfavoriteCount: params.setUnfavoriteCount,
      };
      params.createDogState(newDog, cdsParams);
      toast.success("Dog Created");
    })
    .finally(() => {
      params.setDog(clearDog());
    });
};

const clearDog = () => {
  return {
    name: "",
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
  createDogState(dog: Dog, params: CreateDogStateParams): void;
  allDogs: Dog[];
  setAllDogs(dogs: Dog[]): void;
  setFavoriteCount(count: number): void;
  setUnfavoriteCount(count: number): void;
}

export const FunctionalCreateDogForm = (props: DogFormProps) => {
  const [dog, setDog] = useState(clearDog());

  return (
    <form
      action=""
      id="create-dog-form"
      style={props.activeTab != TAB.createdog ? { display: "none" } : {}}
      onSubmit={(e) =>
        onSubmitDog({
          e: e,
          dog: dog,
          createDogState: (dog, params) => props.createDogState(dog, params),
          setDog: (dog) => setDog(dog),
          allDogs: props.allDogs,
          setAllDogs: (dogs) => props.setAllDogs(dogs),
          setFavoriteCount: (count) => props.setFavoriteCount(count),
          setUnfavoriteCount: (count) => props.setUnfavoriteCount(count),
        })
      }
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
