import { useEffect, useState } from "react";

export function useFetch(url: string, options = {}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // setError(false);

        const res = await fetch(url, options);
        const json = await res.json();
        console.log(res);

        if (res.ok) {
          setData(json);
        } else {
          throw new Error(json.errors);
        }
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [url]);

  return { data, loading, error };
}
