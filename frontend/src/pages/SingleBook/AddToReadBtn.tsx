import { MouseEvent, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../utils/constant.ts";
import { postAPI } from "../../APICalls/postAPI";
import { VolumeInfoType } from "../../types";

interface AddToReadBtnProps {
  volumeInfo: VolumeInfoType;
  id: string;
}

export const AddToReadBtn: React.FC<AddToReadBtnProps> = ({
  volumeInfo,
  id,
}) => {
  const { user } = useContext(UserContext);
  const user_id = user.user_id;
  const URL = BASE_URL + `reviews/user/${user_id}`;

  const body = {
    google_book_id: id,
    status: "to read",
    title: volumeInfo.title,
    author: volumeInfo.authors?.[0],
    genre: volumeInfo.categories?.[0],
    imageUrl: volumeInfo.imageLinks?.thumbnail,
  };

  async function addToRead(e: MouseEvent<HTMLButtonElement>) {
    postAPI(URL, body);
    const target = e.target as HTMLButtonElement;
    target.innerHTML = "Added!";
  }

  return (
    <button
      className="btn btn-outline block w-full"
      onClick={(e) => addToRead(e)}
    >
      Add To Read
    </button>
  );
};
