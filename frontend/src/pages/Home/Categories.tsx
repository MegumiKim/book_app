import SearchLink from "./searchLink";

function Categories() {
  const categories = ["fiction", "history", "mystery", "science", "romance"];

  return (
    <section className="my-20 sm:my-32">
      <h2 className="text-white font-bold text-center mb-10">
        Popular Categories
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 justify-center gap-5 lg:gap-10">
        {categories.map((category) => (
          <div key={category} className={`category-card ${category}`}>
            <SearchLink
              URL={
                import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API +
                `volumes?q=+subject:${category}`
              }
            >
              {category.toUpperCase()}
            </SearchLink>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
