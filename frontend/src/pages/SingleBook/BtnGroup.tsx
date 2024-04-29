import { BASE_URL } from "../../utils/constant.ts";
import { postAPI } from "../../APICalls/postAPI.ts";
import { AddToReadBtn } from "./AddToReadBtn.tsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { RemoveBtn } from "./RemoveBtn.tsx";
import { GoogleBookDataType } from "../../types.ts";

interface ButtonGroupProps {
  bookData: GoogleBookDataType;
  onOpen: () => void;
}
type ReadingStatus = "not added" | "to read" | "have read";

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  bookData,
  onOpen,
}) => {
  const { id: book_id, saleInfo } = bookData;
  const readingStatusURL = BASE_URL + `reviews/book/${book_id}`;

  const { user } = useContext(UserContext);
  const { user_id } = user;
  const [readingStatus, setReadingStatus] =
    useState<ReadingStatus>("not added");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await postAPI(readingStatusURL, { user_id });

      if (data?.status) {
        setReadingStatus(data.status);
      }
    };
    fetchData();
  }, [readingStatus, book_id]);

  // Ensure readingStatus uses the new typet

  const buttonRenderers: { [key in ReadingStatus]: () => JSX.Element } = {
    "not added": () => (
      <>
        <AddToReadBtn volumeInfo={bookData.volumeInfo} id={book_id} />
        <button className="btn btn-accent block w-full" onClick={onOpen}>
          Review This Book
        </button>
      </>
    ),
    "to read": () => (
      <>
        <button className="btn btn-accent block w-full" onClick={onOpen}>
          Review This Book
        </button>
        <RemoveBtn id={book_id} />
      </>
    ),
    "have read": () => (
      <>
        {/* <button className="btn btn-accent block w-full">Edit my Review</button> */}
        <RemoveBtn id={book_id} />
      </>
    ),
  };

  // renderer function based on readingStatus
  const renderButtonsBasedOnStatus = () => {
    const renderer = buttonRenderers[readingStatus];
    return renderer ? renderer() : null;
  };

  return (
    <section className="gap-4 col-span-2 space-y-5 max-w-sm mx-auto md:mx-0">
      {user_id ? (
        renderButtonsBasedOnStatus()
      ) : (
        <Link to="/" className="btn btn-warning w-full">
          Long in to review this book
        </Link>
      )}

      {saleInfo?.saleability == "FREE" && (
        <div className="">
          <a
            href={saleInfo.buyLink}
            className="btn btn-outline w-full align-middle flex"
          >
            READ FREE*
          </a>
          <p>*Jump to Google play. Required Google sign-in</p>
        </div>
      )}
    </section>
  );
};
