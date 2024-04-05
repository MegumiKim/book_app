import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import { postAPI } from "../../APICalls/postAPI";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const btnClass =
    username.length > 3 && password.length > 3 ? "btn-primary" : "btn-disabled";
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginURL = BASE_URL + "users/login";

    const body = {
      username: username,
      password: password,
    };
    const result = await postAPI(loginURL, body);

    if (result.status === "success") {
      setUser(result.data);
      navigate("/home");
    } else {
      setError(true);
      setPassword("");
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
        <h1 className="my-5">Log In</h1>
        <p className={error ? "text-red-400" : "opacity-0"}>
          Invalid username or password
        </p>
        <div className="mb-6">
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
            className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <button type="submit" className={`btn flex-1 ${btnClass}`}>
            Login
          </button>
          <button className="btn-outline btn flex-1" onClick={handleGuestLogin}>
            Log in a demo account
          </button>
        </div>
        <Link to="/signup" className=" w-full flex justify-center my-6 gap-4 ">
          Don't have account yet?{" "}
          <span className="underline">Simple Sign up</span>
        </Link>
      </form>
    </main>
  );
}

export default Login;
