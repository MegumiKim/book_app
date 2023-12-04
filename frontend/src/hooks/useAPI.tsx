import { useState } from "react";

export function useAPI(url: string, body = {}) {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function call() {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      setLoading(true);
      setError(false);

      const res = await fetch(url, options);
      const json = await res.json();

      if (res.ok) {
        setResult(json);
      } else {
        throw new Error(json.errors);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, call };
}
