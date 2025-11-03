import { useEffect, useState } from "react";
import ProductList from "./ProductList";
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
  const [isMobile, setIsMobile] = useState(
    window.innerWidth > 768 ? true : false
  );

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="text-center mt-0">
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
          <ProductList
            products={
              isMobile ? filteredProducts.slice(0, 4) : filteredProducts
            }
          />
        ) : (
          <ErrorShow />
        )}
      </div>

      {/* Load More Btn */}
      <button
        className={`group mt-10 rounded-4xl border border-text-dark p-5 transition-colors ease-in-out duration-400 hover:bg-background-container ${
          isMobile ? "" : "hidden"
        }`}
        onClick={() => {
          setIsMobile(false);
        }}
      >
        <svg
          className="stroke-text-dark group-hover:stroke-amber-100"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
