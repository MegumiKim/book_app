import { useFetch } from "../hooks/useFetch";

const MyReview = (props: { id: string }) => {
  const id = props.id;
  const URL = `http://localhost:5000/books/${id}`;
  const { data } = useFetch(URL);

  return (
    <>
      {data?.reviews?.length ? (
        <section className="my-5 outline rounded-sm p-4">
          <h1>My Review</h1>
          {data.reviews.map((rev, i) => (
            <div key={i}>
              <div>Name: {rev.name}</div>
              <div>Rating: {rev.rating}</div>
              <div>Subject: {rev.subject}</div>
              <div>{rev.review}</div>
            </div>
          ))}
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default MyReview;
