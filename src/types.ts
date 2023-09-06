export interface Dog {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: string;
}

const TAB = {
  NONE: "NONE",
  FAVORITE: "FAVORITE",
  UNFAVORITE: "UNFAVORITE",
  CREATE_DOG: "CREATE_DOG",
} as const;
export type TAB = (typeof TAB)[keyof typeof TAB];
