import { useEffect, useState } from "react";
import { famousQuotes } from "../../utils/famousQuotes";

const RandomQuote = () => {
  const [quote, setQuote] = useState({ quote: "", by: "" });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * famousQuotes.length);
    setQuote(famousQuotes[randomIndex]);
  }, []);

  return (
    <section className="m-auto sm:mt-10 p-4 text-slate-200 max-w-[800px]">
      <h2 className="text-center text-2xl sm:text-5xl sm:my-4 m-auto font-serif">
        {quote.quote}
      </h2>
      <p className="text-center">{quote.by}</p>
    </section>
  );
};

export default RandomQuote;
