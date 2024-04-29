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
  "not added",
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
  volumeInfo: VolumeInfoType;
  id: string;
  avr_rating?: number;
  saleInfo?: { saleability: string; buyLink: string };
}

export interface MyBookDataType {
  google_book_id: string;
  title: string | undefined;
  author?: string[]; // Checks if authors exist and uses the first author, defaults to "Unknown Author"
  genre?: string[]; // Checks if categories exist and uses the first category, defaults to "Unknown Genre"
  imageurl?: string;
}

export interface BookCardProps {
  id: string;
  title: string;
  thumbnail: string;
  created_at?: string;
  genre?: string;
  status?: string;
  author?: string;
  avr_rating?: number;
  publishedDate?: string | null;
  saleInfo?: { saleability: string; buyLink: string };
}
