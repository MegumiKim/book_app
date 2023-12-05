export interface MyBookType {
  id: string | undefined;
  image: string | undefined;
  title: string | undefined;
  status: ReadingStatus | undefined;
  author: [] | undefined;
  reviews: [] | undefined;
}

export enum ReadingStatus {
  "reading",
  "to-read",
  "read",
}
export interface ReviewType {
  name: string;
  subject: string;
  rating: number;
  review: string;
}

export interface BookDataType {
  author: [];
  createdAt: string;
  id: string;
  image: string;
  reviews: [];
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
  imageLinks: { smallThumbnail: string };
  categories?: string[];
  averageRatings?: number;
  subtitle?: string;
};
