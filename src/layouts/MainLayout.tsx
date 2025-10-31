import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";

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

  const location = useLocation();
  const [isMenupage, setIsMenupage] = useState(false);

  useEffect(() => {
    setIsMenupage(location.pathname.endsWith("menu.html"));
  }, [location.pathname]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-text-light">
      <header className="p-4 h-20 grid grid-flow-col gap-4 bg-text-light text-text-dark font-bold">
        <Link
          className="content-center grid grid-flow-col justify-items-start"
          to="/"
        >
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>
        <div
          id="main-menu"
          className="hidden content-center md:grid grid-flow-col gap-2 justify-items-center"
        >
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

          {/* needs improvement yet */}
          <a href="cart.html" className="cart-el">
            <div className="dis-icon"></div>
            <div className="cart-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0942 8.36255L17.1455 15.1959C17.3319 16.4074 16.3945 17.5 15.1688 17.5H4.83122C3.60545 17.5 2.66809 16.4074 2.85448 15.1959L3.90576 8.36255C4.05586 7.38689 4.89536 6.66667 5.88251 6.66667H14.1175C15.1046 6.66667 15.9441 7.38689 16.0942 8.36255Z"
                  stroke="#403F3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.6668 4.16667C11.6668 3.24619 10.9206 2.5 10.0002 2.5C9.07969 2.5 8.3335 3.24619 8.3335 4.16667"
                  stroke="#403F3D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="cart-item-count"></div>
          </a>
        </div>

        <div className="hidden content-center md:grid grid-flow-col justify-items-end">
          <Link
            to="menu.html"
            className={`${
              isMenupage ? "pointer-events-none text-gray-400" : ""
            } transition-all duration-400 ease-in-out hover:text-text-accent`}
          >
            Menu
          </Link>
        </div>

        {/* burger menu, needs implementation yet */}
        <div className="md:hidden flex justify-end z-999">
          <button
            aria-label="Menu"
            onClick={toggleMenu}
            className="relative z-50 w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 bg-background-body shadow-md transition-all duration-300"
          >
            {/* Burger Lines */}
            <span
              className={`absolute block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-px" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-px" : "translate-y-2"
              }`}
            ></span>
          </button>

          {/* Full-screen menu */}
          <nav
            className={`fixed inset-0 bg-background-body flex flex-col items-center justify-center gap-6 text-lg font-semibold text-gray-800 transition-all duration-500 ${
              menuOpen
                ? "opacity-100 visible translate-x-0"
                : "opacity-0 invisible translate-x-full"
            }`}
          >
            <ul className="flex flex-col items-center gap-6">
              <li>
                <a href="#carousel" onClick={toggleMenu}>
                  Favorite coffee
                </a>
              </li>
              <li>
                <a href="#about" onClick={toggleMenu}>
                  About
                </a>
              </li>
              <li>
                <a href="#apps" onClick={toggleMenu}>
                  Mobile app
                </a>
              </li>
              <li>
                <a href="#footer" onClick={toggleMenu}>
                  Contact us
                </a>
              </li>
              <li>
                <a href="login.html" onClick={toggleMenu}>
                  Login
                </a>
              </li>
              <li>
                <a href="register.html" onClick={toggleMenu}>
                  Register
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="menu.html" onClick={toggleMenu}>
                  Menu
                </a>
                <img
                  src="/assets/images/coffee-cup.png"
                  alt="coffee cup"
                  className="w-6 h-6"
                />
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="cart.html"
                  className="cart-el-side"
                  onClick={toggleMenu}
                >
                  Cart
                </a>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0942 8.36255L17.1455 15.1959C17.3319 16.4074 16.3945 17.5 15.1688 17.5H4.83122C3.60545 17.5 2.66809 16.4074 2.85448 15.1959L3.90576 8.36255C4.05586 7.38689 4.89536 6.66667 5.88251 6.66667H14.1175C15.1046 6.66667 15.9441 7.38689 16.0942 8.36255Z"
                    stroke="#403F3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6668 4.16667C11.6668 3.24619 10.9206 2.5 10.0002 2.5C9.07969 2.5 8.3335 3.24619 8.3335 4.16667"
                    stroke="#403F3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            </ul>
          </nav>
        </div>
        {/* end of burger menu */}
      </header>

      <main className="grow p-6">{children}</main>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
