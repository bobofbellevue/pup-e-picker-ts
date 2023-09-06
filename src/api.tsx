import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const handleErrorResponse = (response: Response, message: string) => {
  if (!response.ok) {
    throw new Error(message);
  }
  return response;
};

export const Requests = {
  getAllDogs: async () => {
    return fetch(`${baseUrl}/dogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => handleErrorResponse(response, "Unable to load dogs."))
      .then((response) => response.json());
  },

  postDog: async (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        handleErrorResponse(response, "Unable to create dog.")
      )
      .then((response) => response.json());
  },

  updateDog: async (dog: Dog) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      body: JSON.stringify(dog),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        handleErrorResponse(response, "Unable to update dog.")
      )
      .then((response) => response.json());
  },

  deleteDog: async (dog: Dog) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        handleErrorResponse(response, "Unable to delete dog.")
      )
      .then((response) => response.json());
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
