export interface Dog {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: string;
}

export enum TAB {
  none = 0,
  favorite,
  unfavorite,
  createdog,
}

export interface CreateDogStateParams {
  allDogs: Dog[];
  setAllDogs(dogs: Dog[]): void;
  setFavoriteCount(count: number): void;
  setUnfavoriteCount(count: number): void;
}