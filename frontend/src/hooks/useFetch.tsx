import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T | unknown;
  loading: boolean;
  error: boolean;
}

export function useFetch<T>(url: string, options = {}): FetchResult<T> {
  const [data, setData] = useState<T | unknown>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // setError(false);

        const res = await fetch(url, options);
        const json = await res.json();
        console.log(json);

        if (res.ok) {
          setData(json);
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

    getData();
  }, [url]);

  return { data, loading, error };
}
