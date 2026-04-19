import { useState, useEffect } from "react";
import { fetchData, type HttpError } from "../api/fetchData";

interface StreetsMap {
  [city: string]: string[];
}

interface User {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: string;
  paymentMethod: string;
}

const streetsByCity: StreetsMap = {
  Tbilisi: [
    "Rustaveli",
    "Agmashenebeli",
    "Shardeni",
    "Ilia Chavchavadze",
    "Kazbegi",
    "Leselidze",
    "Erekle II",
    "Abanotubani",
    "Lado Asatiani",
    "Irakli Abashidze",
  ],
  Batumi: [
    "Gagarin",
    "Tabidze",
    "Bagrationi",
    "Juli Shartava",
    "Pushkin",
    "Zurab Gorgiladze",
    "Mayakovsky",
    "Segi Meskhi",
    "Noneshvili",
    "Katamadze",
  ],
  Kutaisi: [
    "Queen Tamar",
    "Merab Kostava",
    "Mkhurnali",
    "Kupradze",
    "Tkabladze",
    "Notar Dombakhi",
    "Chechelashvili",
    "26 Maisi",
    "Solomon Meore",
    "9 April",
  ],
};

export default function Register() {
  const [user, setUser] = useState<User>({
    login: "",
    password: "",
    confirmPassword: "",
    city: "",
    street: "",
    houseNumber: "",
    paymentMethod: "",
  });

  const [streets, setStreets] = useState<string[]>([]);
  const [registerMessage, setRegisterMessage] = useState<string>("");
  const error = {
    login:
      "Login must start with a letter, at least 3 characters, only English letters.",
    password:
      "Password must be at least 6 characters and include a special character.",
    confirmPassword: "Passwords do not match, or field is empty.",
    city: "Please select a city.",
    street: "Please select a street.",
    houseNumber: "House number must be greater than 1.",
    paymentMethod: "Select cash or card.",
  };
  const [loginErr, setLoginErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmpasswordErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [streetErr, setStreetErr] = useState(false);
  const [houseErr, setHouseErr] = useState(false);
  const [paymethodErr, setPayMethodErr] = useState(false);

  useEffect(() => {
    if (user.city && streetsByCity[user.city]) {
      setStreets(streetsByCity[user.city]);
    } else {
      setStreets([]);
      setUser((prev) => ({ ...prev, street: "" }));
    }
  }, [user.city]);

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

  const validateConfirmPassword = (): boolean => {
    if (user.password !== user.confirmPassword || !user.confirmPassword) {
      setConfirmpasswordErr(true);
      return false;
    }
    setConfirmpasswordErr(false);
    return true;
  };

  const validateCity = (): boolean => {
    if (!user.city) {
      setCityErr(true);
      return false;
    }
    setCityErr(false);
    return true;
  };

  const validateStreet = (): boolean => {
    if (!user.street) {
      setStreetErr(true);
      return false;
    }
    setStreetErr(false);
    return true;
  };

  const validateHouse = (): boolean => {
    const num = parseInt(user.houseNumber, 10);
    if (isNaN(num) || num <= 1) {
      setHouseErr(true);
      return false;
    }
    setHouseErr(false);
    return true;
  };

  const validatePaymentMethod = (): boolean => {
    if (!user.paymentMethod) {
      setPayMethodErr(true);
      return false;
    }
    setPayMethodErr(false);
    return true;
  };

  const isFormValid = (): boolean => {
    return (
      validateLogin() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validateCity() &&
      validateStreet() &&
      validateHouse() &&
      validatePaymentMethod()
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, name, value } = e.target;
    const key = name || id;
    if (!key) return; // ignore if no name/id
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setRegisterMessage("⚠️ Please correct the highlighted errors.");
      return;
    }

    try {
      const payload = {
        ...user,
        houseNumber: Number(user.houseNumber), // convert houseNumber to number for backend
      };
      const response = await fetchData("auth/register", "POST", payload);
      const data = await response.json();
      console.log(data.message);
      localStorage.setItem("user", JSON.stringify(payload));
      setRegisterMessage("✅ Registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "menu";
      }, 3000);
    } catch (err: unknown) {
      const error = err as HttpError;

      if (error.status === 409) {
        setRegisterMessage(
          "⚠️ Duplicated Username. Please choose another one."
        );
      } else if (error.status) {
        setRegisterMessage(`⚠️ ${error.message}.`);
      } else {
        setRegisterMessage("⚠️ Server error. Please try again later.");
      }

      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <h1 className="text-5xl font-bold text-text-dark">Registration</h1>
      <form
        className="flex flex-col gap-5 text-text-dark"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="grid lg:flex gap-4">
          {/* Login */}
          <div className="flex flex-col">
            <span className="text-xl">Login</span>
            <input
              id="login"
              name="login"
              value={user.login}
              onChange={handleChange}
              onBlur={validateLogin}
              onFocus={() => setLoginErr(false)}
              className="text-xl border border-border-light rounded-xl p-3"
              placeholder="Enter username"
            />
            {error.login && (
              <div className={`text-red-600 ${loginErr ? "" : "hidden"}`}>
                {error.login}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <span className="text-xl">Password</span>
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              onBlur={validatePassword}
              onFocus={() => setPasswordErr(false)}
              className="text-xl border border-border-light rounded-xl p-3"
              placeholder="Enter password"
            />
            {error.password && (
              <div className={`text-red-600 ${passwordErr ? "" : "hidden"}`}>
                {error.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <span className="text-xl">Confirm Password</span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
              onBlur={validateConfirmPassword}
              onFocus={() => setConfirmpasswordErr(false)}
              className="text-xl border border-border-light rounded-xl p-3"
              placeholder="Confirm password"
            />
            {error.confirmPassword && (
              <div
                className={`text-red-600 ${confirmPasswordErr ? "" : "hidden"}`}
              >
                {error.confirmPassword}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:flex gap-4">
          {/* City */}
          <div className="flex flex-col">
            <span className="text-xl">City</span>
            <select
              id="city"
              name="city"
              value={user.city}
              onChange={handleChange}
              onBlur={validateCity}
              onFocus={() => setCityErr(false)}
              className="text-xl border border-border-light rounded-xl p-3"
            >
              <option value="">Select City</option>
              <option value="Tbilisi">Tbilisi</option>
              <option value="Batumi">Batumi</option>
              <option value="Kutaisi">Kutaisi</option>
            </select>
            {error.city && (
              <div className={`text-red-600 ${cityErr ? "" : "hidden"}`}>
                {error.city}
              </div>
            )}
          </div>

          {/* Street */}
          <div className="flex flex-col">
            <span className="text-xl">Street</span>
            <select
              id="street"
              name="street"
              value={user.street}
              onChange={handleChange}
              onBlur={validateStreet}
              onFocus={() => setStreetErr(false)}
              className="text-xl border border-border-light rounded-xl p-3"
            >
              <option value="">Select Street</option>
              {streets.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {error.street && (
              <div className={`text-red-600 ${streetErr ? "" : "hidden"}`}>
                {error.street}
              </div>
            )}
          </div>

          {/* House number */}
          <div className="flex flex-col">
            <span className="text-xl">House number</span>
            <input
              id="houseNumber"
              name="houseNumber"
              type="number"
              value={user.houseNumber || ""}
              onChange={handleChange}
              onBlur={validateHouse}
              onFocus={() => setHouseErr(false)}
              className="text-xl border border-border-light rounded-xl p-3"
              placeholder="Enter house number"
            />
            {error.houseNumber && (
              <div className={`text-red-600 ${houseErr ? "" : "hidden"}`}>
                {error.houseNumber}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="flex flex-col">
            <span className="text-xl">Paid by</span>
            <div className="flex gap-4 pt-2">
              <label className="text-xl flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={user.paymentMethod === "cash"}
                  onChange={handleChange}
                />
                Cash
              </label>
              <label className="text-xl flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={user.paymentMethod === "card"}
                  onChange={handleChange}
                />
                Card
              </label>
              {error.paymentMethod && (
                <div className={`text-red-600 ${paymethodErr ? "" : "hidden"}`}>
                  {error.paymentMethod}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`text-xl w-full lg:w-1/2 self-center border border-border-dark rounded-4xl py-3 my-3 transition-all duration-300 hover:text-text-light hover:bg-background-container ${
            registerMessage.startsWith("✅")
              ? "pointer-events-none bg-background-container/50"
              : ""
          }`}
        >
          Register
        </button>
      </form>

      {registerMessage && (
        <div
          className={`text-center ${
            registerMessage.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {registerMessage}
        </div>
      )}
    </div>
  );
}
