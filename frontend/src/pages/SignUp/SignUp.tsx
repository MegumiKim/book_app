import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import { postAPI } from "../../APICalls/postAPI";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/home");
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
    navigate("/home");
  };

  return (
    <main>
      <div className="background" id="background2"></div>
      <form
        className="max-w-md my-10 text-white mx-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="my-5">Simple Sign Up</h1>
        <p className={error ? "text-red-400" : "opacity-0"}>
          Failed to sign up. If you are already an user,{" "}
          <Link to="/" className="underline">
            please log in
          </Link>
        </p>
        <div className="mb-6 mt-2">
          <label htmlFor="username" className="block mb-2 text-sm font-medium ">
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            placeholder="ExampleUser"
            className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium ">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="••••••••"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Sign up
          </button>
          <button className="btn-outline btn flex-1" onClick={handleGuestLogin}>
            Visit with a demo account
          </button>
        </div>
        <Link to="/" className=" w-full flex justify-center my-6 gap-4 ">
          Have an account? <span className="underline "> Log in</span>
        </Link>
      </form>
    </main>
  );
}

export default SignUp;
