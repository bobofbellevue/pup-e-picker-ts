import { Requests } from "./api";

const messAround = async () => {
  const responseAllDogs = Requests.getAllDogs()
    .then((dogs) => {
      console.log(dogs);
      console.log('responseAllDogs: ' + responseAllDogs);
      console.log('typeof responseAllDogs: ' + typeof responseAllDogs);
    })

  /*
  const chihuahua = {
    name: "Ladybug",
    image: "/assets/chihuahua.avif",
    description: "Grandmother Hunsecker's longest living little dog.",
    isFavorite: true,
    id: '',
  };
  let newDogId = '';
  Requests.postDog(chihuahua)
    .then((response) => {
      newDogId = response.id;
    })
    .finally(() => {
      console.log("newDogId is " + newDogId);
      chihuahua.name = "Boy Dog";
      chihuahua.description = "Boy Dog liked to sing when grandmother Hunsecker played the organ.";
      chihuahua.id = newDogId;
      console.log('messAround: chihuahua.id is ' + chihuahua.id);
      Requests.updateDog(chihuahua);
    });
  */

  Requests.dummyFunction();
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};
