export const postAPI = async (URL, body) => {
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
