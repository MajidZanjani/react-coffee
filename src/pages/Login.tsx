import { useState } from "react";
import { fetchData, type HttpError } from "../api/fetchData";
import { Link } from "react-router-dom";

interface User {
  login: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User>({ login: "", password: "" });
  const [loginErr, setLoginErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string>("");
  const error = {
    login:
      "Login must start with a letter, at least 3 characters, only English letters.",
    password:
      "Password must be at least 6 characters and include a special character.",
  };
  const validateLogin = (): boolean => {
    const pattern = /^[A-Za-z][A-Za-z]{2,}$/;
    if (!pattern.test(user.login)) {
      setLoginErr(true);
      return false;
    }
    setLoginErr(false);
    return true;
  };

  const validatePassword = (): boolean => {
    const pattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!pattern.test(user.password)) {
      setPasswordErr(true);
      return false;
    }
    setPasswordErr(false);
    return true;
  };

  const isFormValid = (): boolean => validateLogin() && validatePassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setLoginMessage("⚠️ Please correct the highlighted errors.");
      return;
    }

    try {
      const response = await fetchData("auth/login", "POST", user);
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.data.user));
      console.log(JSON.stringify(data.data.user));

      setLoginMessage("✅ Login successful! Redirecting...");
      setTimeout(() => (window.location.href = "menu"), 3000);
    } catch (err: unknown) {
      const httpError = err as HttpError;
      if (httpError.status == 401) {
        setLoginMessage(`⚠️ Invalid credentials.`);
      } else {
        setLoginMessage("⚠️ Server error. Please try again later.");
      }
      console.error(httpError);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl font-bold text-text-dark">Sign In</h1>

      <form
        className="grid lg:flex lg:flex-col sm:w-xs gap-5 text-text-dark"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="grid lg:flex flex-col">
          <span className="text-xl">User Name</span>
          <input
            name="login"
            type="text"
            value={user.login}
            onChange={handleChange}
            onBlur={validateLogin}
            onFocus={() => setLoginErr(false)}
            className="text-xl border border-border-light rounded-xl p-3"
            placeholder="Enter username"
          />
          <div
            id="user-error"
            className={`text-red-600 ${loginErr ? "" : "hidden"}`}
          >
            {error.login}
          </div>
        </div>

        <div className="grid lg:flex flex-col">
          <span className="text-xl">Password</span>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            onBlur={validatePassword}
            onFocus={() => setPasswordErr(false)}
            className="text-xl border border-border-light rounded-xl p-3"
            placeholder="Enter password"
          />
          <div
            id="password-error"
            className={`text-red-600 ${passwordErr ? "" : "hidden"}`}
          >
            {error.password}
          </div>
        </div>

        <button
          type="submit"
          className={`text-xl border border-border-dark rounded-4xl py-3 my-3 transition-all ease-in-out duration-300 hover:text-text-light hover:bg-background-container ${
            loginMessage.startsWith("✅")
              ? "pointer-events-none bg-background-container/50"
              : ""
          }`}
        >
          Login
        </button>

        <div className="text-xl text-text-dark py-5 w-full">
          <h1>Don't have a user name?</h1>
          <h1>
            Register as a new user{" "}
            <Link
              to="register"
              className="transition-all duration-300 ease-in-out text-red-500 hover:text-text-accent"
            >
              here
            </Link>
            .
          </h1>
        </div>
      </form>

      {loginMessage && (
        <div
          className={`text-center ${
            loginMessage.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {loginMessage}
        </div>
      )}
    </div>
  );
}
