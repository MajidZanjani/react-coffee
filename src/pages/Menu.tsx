import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { fetchData } from "../api/fetchData";
import ErrorShow from "../components/ErrorShow";

interface Size {
  size: string;
  price: string;
  discountPrice: string;
}

interface Additive {
  name: string;
  price: string;
  discountPrice: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  category: string;
  sizes: {
    s: Size;
    m: Size;
    l: Size;
    xl: Size;
  };
  additives: Additive[];
}

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

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Coffee");
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchData("products", "GET");
      const data = await response.json();
      if (!response) {
        console.log("API error");
        setProducts([]);
      } else {
        setProducts(data.data);
      }
    };
    loadData();
  }, []);

  let filteredProducts: Product[] = [];

  if (products) {
    filteredProducts = products.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  return (
    <div className="text-center mt-0">
      <div
        id="alert"
        className="hidden flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <svg
          className="shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Error</span>
        <div className="ms-3 text-sm font-medium">
          Something went wrong with the server. Please try again.
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
          data-dismiss-target="#alert-2"
          aria-label="Close"
          onClick={() => {
            const el = document.getElementById("alert") as HTMLElement;
            el.classList.add("hidden");
          }}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>

      <div id="title" className="text-text-dark font-bold text-6xl">
        <h1>Behind each of our cups hides an</h1>
        <h1 className="text-text-accent italic">amazing surprise</h1>
        <h1
          className={`mt-8 text-sky-500 text-3xl italic text-shadow-lg/10 text-shadow-coffee ${
            user ? "hidden" : ""
          }`}
        >
          Register or Login to see special deals!
        </h1>
      </div>

      {/* CATEGORY BUTTONS */}
      <div id="cat-select" className="grid sm:flex justify-center gap-4 my-10">
        {["Coffee", "Tea", "Dessert"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`border-2 border-border-light p-2 rounded-4xl w-full sm:w-35 grid grid-cols-3 content-center transition-all duration-400 
              hover:bg-background-container hover:text-text-light
              ${
                selectedCategory === cat
                  ? "bg-background-container text-text-light"
                  : ""
              }
            `}
          >
            <img
              src={`/assets/images/icon-${cat.toLowerCase()}.png`}
              alt={cat}
              className="w-8 h-8"
            />
            <h1 className="content-center col-span-2">{cat}</h1>
          </button>
        ))}
      </div>

      {/* PRODUCT LIST */}
      <div id="products">
        {filteredProducts.length != 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <ErrorShow />
        )}
      </div>
    </div>
  );
}
