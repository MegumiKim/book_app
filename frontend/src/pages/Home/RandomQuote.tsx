import { useFetch } from "../../hooks/useFetch";

type DataType = { content: string; author: string };

const RandomQuote = () => {
  const URL = "https://api.quotable.io/random?maxLength=40";
  const { data } = useFetch<DataType>(URL);

  if (data) {
    return (
      <div className="m-auto mt-20 p-4 text-slate-200">
        <h2 className="text-center text-5xl my-5 m-auto">{data.content}</h2>
        <p className="text-center">by {data.author || ""}</p>
      </div>
    );
  } else {
    return;
  }
};

export default RandomQuote;
