import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../utils/constant.ts";
import { useNavigate } from "react-router-dom";
import removeIcon from "../../../public/icons/remove.svg";

interface AddToReadBtnProps {
  id: string;
}

export const RemoveBtn: React.FC<AddToReadBtnProps> = ({ id }) => {
  const { user } = useContext(UserContext);
  const [err, setErr] = useState("");
  const user_id = user.user_id;
  const URL = BASE_URL + `reviews/user/${user_id}/book/${id}`;
  const navigate = useNavigate();

  async function remove() {
    try {
      const res = await fetch(URL, {
        method: "DELETE",
      });

      if (res.ok) {
        navigate(`/user/${user_id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      setErr("Failed to remove");
    }
  }

  return (
    <div>
      <button className="btn btn-outline flex w-full" onClick={remove}>
        <img src={removeIcon} alt="remove" className="max-w-[20px]" />
        Remove from bookshelf
      </button>
      <p>{err}</p>
    </div>
  );
};
