import { BASE_URL } from "../utils/constant";
import { postAPI } from "./postAPI";

export const signUp = async (username: string, password: string) => {
  const reviewURL = BASE_URL + `users`;
  const reviewBody = {
    name: username,
    password: password,
  };
  return postAPI(reviewURL, reviewBody);
};
