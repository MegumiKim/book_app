export interface MyBookType {
  id: string | undefined;
  image: string | undefined;
  title: string | undefined;
  status: string;
  author: [] | undefined;
  reviews: [] | undefined;
}

export enum ReadingStatus {
  "reading",
  "to-read",
  "read",
}
export interface ReviewType {
  // name: string;
  // subject: string;
  rating: number;
  text: string;
}

export interface BookDataType {
  author: string[];
  createdAt: string;
  id: string;
  image: string;
  review: ReviewType;
  status: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type GoogleBookDataType = {
  title: string;
  authors: string[];
  description: string;
  imageLinks: { thumbnail: string };
  categories?: string[];
  averageRatings?: number;
  subtitle?: string;
  publisher?: string;
};
