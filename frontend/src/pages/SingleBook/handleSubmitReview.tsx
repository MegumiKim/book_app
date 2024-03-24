export const handleSubmitReview = async (bookData, e) => {
  e.preventDefault();
  const bookID = bookData.id;
  const getBookURL = `http://localhost:4000/api/v1/books/${bookID}`;
  const reviewURL = `http://localhost:4000/api/v1/reviews/${bookID}`;
  const createBookURL = "http://localhost:4000/api/v1/books/";

  console.log(bookID);

  const headers = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}`,
  };

  // Function to handle posting the review
  const postReview = async () => {
    const reviewBody = {
      user_id: 3,
      status: "have read",
      review: "Great",
      rating: 5,
      read_date: "2023-01-15",
    };

    const reviewResponse = await fetch(reviewURL, {
      method: "POST",
      headers,
      body: JSON.stringify(reviewBody),
    });

    const reviewData = await reviewResponse.json();
    console.log(reviewData);
  };

  // Function to handle book creation
  const createBook = async () => {
    const bookBody = {
      google_book_id: bookID,
      title: "title",
      author: "megumi", // Assuming there's at least one author
      imageUrl: "123",
    };

    const bookResponse = await fetch(createBookURL, {
      method: "POST",
      headers,
      body: JSON.stringify(bookBody),
    });

    const bookData = await bookResponse.json();
    console.log(bookData);
    await postReview(); // Post the review after the book has been created
  };

  try {
    // Check if the book exists
    const bookResponse = await fetch(getBookURL);
    if (bookResponse.ok) {
      // If the book exists, post the review
      await postReview();
    } else {
      // If the book does not exist, create the book then post the review
      await createBook();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

//   const body = {
//     title: bookData.title,
//     isbn: bookData.industryIdentifiers[0].ISBN_10 || 0,
//   };

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(body),
//   };

//   try {
//     const apiURL = "http://localhost:4000/api/v1/reviews/" + 1;
//     const result = await fetch(apiURL, options);
//     const json = await result.json();

//     if (result.ok) {
//       // Handle the json response, if needed
//       console.log(result);
//       // props.onReviewPosted();
//     } else {
//       throw new Error("failed to post review");
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     document.getElementById("closeBtn")?.click();
//     // reset();
//   }
