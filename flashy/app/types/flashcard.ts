import { User } from "./user";

export enum Visibility {
  Public = "Offentlig",
  Private = "Privat",
}

export type FlashcardSet = {
  id: string;
  creator?: User;
  coAuthors?: User[];
  coverImage?: string;
  title: string;
  numViews: number;
  numOfLikes: number;
  numOfFavorites: number;
  numOfComments?: number;
  userHasLiked?: boolean;
  userHasFavorited?: boolean;
  comments?: FlashcardComment[];
  views?: FlashcardView[];
  visibility?: Visibility;
  createdAt: Date;
  popularityScore: number;
};

// Used to save on read operations
export type ShallowFlashcardSet = {
  id: string;
  creator: User | undefined;
  title: string;
  numViews: number;
  numOfLikes: number;
  visibility: Visibility;
};

export type FlashcardFlagged = {
  cardsFlagged: string[];
};

export type FlashcardComment = {
  id: string;
  commentedBy: User | undefined;
  content: string;
  createdAt: Date;
};

export type FlashcardView = {
  id: string;
  isCopy?: boolean;
  front: string;
  back: string;
};

export type CreateFlashCardType = {
  creator: User;
  coAuthors: string[];
  title: string;
  views: CreateViewType[];
  visibility: Visibility;
  createdAt: Date;
  image?: File;
};

export type CreateViewType = Pick<FlashcardView, "front" | "back">;

export type EditFlashCardType = {
  views: EditFlashcardView[];
  visibility: Visibility;
  coAuthors: User[];
};

export type EditFlashcardView = Pick<FlashcardView, "front" | "back"> & {
  id?: string;
};

export type CreateNewCommentType = {
  commentedBy: User;
  content: string;
};
