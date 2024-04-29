import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant.ts";
import { postAPI } from "../../APICalls/postAPI";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const disabled = username.length > 3 && password.length > 3 ? false : true;
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signUpURL = BASE_URL + `users`;
    const signUpBody = {
      name: username,
      password: password,
    };
    const response = await postAPI(signUpURL, signUpBody);
    if (response.status === "success") {
      setUser(response.data);
      navigate("/");
    } else {
      setError(true);
    }
  };

  const handleGuestLogin = () => {
    const guestAccount = {
      name: "Guest",
      user_id: 1,
    };
    setUser(guestAccount);
    navigate("/");
  };

  return (
    <main>
      <div className="background" id="background2"></div>
      <form
        className="max-w-md my-10 text-white mx-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="my-5">
          <h1>Sign up</h1>
          <Link to="/login" className=" my-6 gap-4 ">
            Have already an account? <span className="underline">Log in</span>
          </Link>
        </div>
        <div className="mb-6 mt-2">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            min={4}
            required
            placeholder="ExampleUser"
            className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            min={4}
            required
            placeholder="****"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <button
            type="submit"
            className="btn btn-warning flex-1"
            disabled={disabled}
          >
            Login
          </button>
          <button className="btn-outline btn flex-1" onClick={handleGuestLogin}>
            Visit with a demo account
          </button>
        </div>

        <p className={error ? "text-red-400 text-lg mt-5" : "opacity-0"}>
          Failed to sign up. User name exists.
          <Link to="/" className=" block">
            If you are already an user, please{" "}
            <span className="underline">log in</span>
          </Link>
        </p>
      </form>
    </main>
  );
}

export default SignUp;
