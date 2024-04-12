export interface MyBookType {
  id: string | undefined;
  image: string | undefined;
  title: string | undefined;
  status: string;
  author: string[] | undefined;
  review?: [] | undefined;
  reviews?: [] | undefined;
  volumeInfo?: GoogleBookDataType;
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

export type VolumeInfoType = {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  imageLinks?: { thumbnail: string };
  categories?: string[];
  averageRating?: number;
  subtitle?: string;
  publisher?: string;
  publishedDate?: string;
};

// New Types
export interface GoogleBookDataType {
  VolumeInfo: VolumeInfoType;
  avr_rating?: number;
  saleInfo?: { saleability: string; buyLink: string };
}
