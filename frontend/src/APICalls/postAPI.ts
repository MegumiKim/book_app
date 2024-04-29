export const postAPI = async (
  URL: string,
  body: {
    username?: string;
    password?: string;
    name?: string;
    google_book_id?: string;
    title?: string;
    author?: string;
    genre?: string | undefined;
    imageurl?: string;
    status?: string;
    imageUrl?: string | undefined;
    user_id?: number | null;
  }
) => {
  const headers = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}`,
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);

      return json;
    } else {
      console.log(response);

      throw new Error(json?.error || "Failed to fetch data");
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};
