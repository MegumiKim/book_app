import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import { postAPI } from "../../APICalls/postAPI";
import { MyShelfContext } from "../../context/MyShelfContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const disabled = username.length > 3 && password.length > 3 ? false : true;
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const { setMyBooks } = useContext(MyShelfContext);
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
      const bookShelfURL = BASE_URL + "reviews/user/" + result.data.user_id;
      try {
        const response = await fetch(bookShelfURL);
        const json = await response.json();
        setMyBooks(json?.data);

        navigate("/home");
      } catch (error) {
        throw new Error(error);
      }
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
    <main className="md:flex gap-10 justify-center lg:max-w-[1200px]">
      {/* <div className="background" id="background3"></div> */}
      <form
        className="max-w-md my-10 text-white mx-5 flex-1"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="my-5">
          <h1>Log In</h1>
          <Link to="/signup" className=" my-6 gap-4 ">
            Don't have an account yet?{" "}
            <span className="underline">Sign up</span>
          </Link>
        </div>

        <div className="my-3">
          <label htmlFor="username" className="block mb-2 ">
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
            onFocus={() => setError(false)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 ">
            Password
          </label>
          <input
            type="password"
            id="password"
            min={4}
            required
            placeholder="••••••••"
            className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError(false)}
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
          Invalid username or password
        </p>
      </form>
      <div className="py-10 flex-1 md:max-w-[400px] m-auto">
        <img
          src="./man.jpg"
          alt="a man looking down a giant book"
          className="rounded-3xl"
        />
      </div>
    </main>
  );
}

export default Login;
