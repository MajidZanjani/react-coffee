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
