import { Link } from "react-router-dom";
import Footer from "./Footer";

interface User {
  id: number;
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="min-h-screen flex flex-col bg-text-light">
      <header className="p-4 h-20 grid grid-flow-col gap-4 bg-text-light text-text-dark font-bold">
        <Link
          className="content-center grid grid-flow-col justify-items-start"
          to="/"
        >
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>
        <div className="content-center grid grid-flow-col justify-items-center">
          <a
            className="transition-all duration-400 ease-in-out hover:text-text-accent"
            href="#carousel"
          >
            Favorite coffee
          </a>
          <a
            className="transition-all duration-400 ease-in-out hover:text-text-accent"
            href="#about"
          >
            About
          </a>
          <a
            className="transition-all duration-400 ease-in-out hover:text-text-accent"
            href="#apps"
          >
            Mobile app
          </a>
          <a
            className="transition-all duration-400 ease-in-out hover:text-text-accent"
            href="#footer"
          >
            Contact us
          </a>
          <a
            className={`transition-all duration-400 ease-in-out hover:text-text-accent ${
              user ? "hidden" : ""
            }`}
            href="login.html"
          >
            Login
          </a>
          <a
            className={`transition-all duration-400 ease-in-out hover:text-text-accent ${
              user ? "hidden" : ""
            }`}
            href="register.html"
          >
            register
          </a>
        </div>
        <div className="content-center grid grid-flow-col justify-items-end">
          <a
            className="transition-all duration-400 ease-in-out hover:text-text-accent"
            href="cart.html"
          >
            Cart
          </a>
          <Link
            to="menu.html"
            className="transition-all duration-400 ease-in-out hover:text-text-accent"
          >
            Menu
          </Link>
        </div>
      </header>

      <main className="grow p-6">{children}</main>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
