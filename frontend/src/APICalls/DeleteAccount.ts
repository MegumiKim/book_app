import { BASE_URL } from "../utils/constant";

export async function deleteUserAccount(id: number | null, setUser, navigate) {
  const deleteURL = BASE_URL + `users/${id}`;
  const headers = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}`,
  };

  try {
    const response = await fetch(deleteURL, {
      method: "DELETE",
      headers,
    });

    if (response.ok) {
      setUser({
        name: "Guest",
        user_id: null,
      });

      navigate("/home");
    }
    throw new Error();
  } catch (error) {
    console.log(error);
  }
}
