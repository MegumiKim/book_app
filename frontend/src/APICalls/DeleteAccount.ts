import { BASE_URL } from "../utils/constant";

export async function deleteUserAccount(id: number | null) {
  const deleteURL = BASE_URL + `users/${id}`;
  const headers = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}`,
  };

  const response = await fetch(deleteURL, {
    method: "DELETE",
    headers,
  });

  if (response.ok) {
    return;
  }
  throw new Error();
}
