import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import { postAPI } from "../../APICalls/postAPI";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginURL = BASE_URL + "users/login";

    const body = {
      username: username,
      password: password,
    };
    const result = await postAPI(loginURL, body);
    console.log(result);
    if (result.status === "success") {
      setUser(result.data);
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <form
      className="max-w-sm mx-auto my-10 text-white"
      onSubmit={(e) => handleSubmit(e)}
    >
      {error && <p>{error}</p>}

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
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Login
      </button>
      <Link to="/home">Visit as guest</Link>
    </form>
  );
}

export default Login;
