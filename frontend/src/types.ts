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
