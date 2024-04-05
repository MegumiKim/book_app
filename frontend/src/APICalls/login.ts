// import { BASE_URL } from "../utils/constant";
// import { postAPI } from "./postAPI";

// export async function login(username, password) {
//   const loginURL = BASE_URL + "users/login";

//   const body = {
//     username: username,
//     password: password,
//   };

//   const result = await postAPI(loginURL, body);
//   if (result.status === "success" && password === result?.data?.password) {
//     return result.data; // On successful login, return the data (which should NOT include sensitive info like password)
//   } else {
//     throw new Error(result.message || "Login failed"); // Use server-provided message or a generic error
//   }
// }
