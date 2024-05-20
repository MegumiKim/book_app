import { useEffect, useState } from "react";
import { famousQuotes } from "../../utils/famousQuotes";
import BookSearchLinkBtn from "./BookSearchLinkBtn";

const RandomQuote = () => {
  const [quote, setQuote] = useState({ quote: "", by: "" });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * famousQuotes.length);
    setQuote(famousQuotes[randomIndex]);
  }, []);

  const URL =
    import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API +
    `volumes?q=+author:${quote.by}`;

  return (
    <section className="m-auto sm:mt-10 p-4 text-slate-200 max-w-md lg:max-w-3xl flex flex-col align-middle">
      <h2 className="text-center text-2xl sm:text-3xl lg:text-5xl m-auto font-serif ">
        {quote.quote}
      </h2>

      <div className="w-full text-center my-5 text-yellow-200 font-bold">
        <BookSearchLinkBtn URL={URL}>- {quote.by}</BookSearchLinkBtn>
      </div>
    </section>
  );
};

export default RandomQuote;
