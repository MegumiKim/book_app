import { BASE_URL } from "../utils/constant";
import { postAPI } from "./postAPI";

export async function getAUser(username: string, password: string) {
  const loginURL = BASE_URL + "users/login";

  const body = {
    username: username,
    password: password,
  };

  return await postAPI(loginURL, body);
}
