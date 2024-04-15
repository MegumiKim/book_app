import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T;
  loading: boolean;
  error: boolean;
}

export function useFetch<T>(
  url: string,
  options = {}
): FetchResult<T | undefined> {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // setError(false);

        const res = await fetch(url, options);
        const json = await res.json();

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
