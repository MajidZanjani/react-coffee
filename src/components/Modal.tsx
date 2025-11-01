import { useEffect, useRef, useState } from "react";
import { fetchData } from "../api/fetchData";

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

interface ModalProps {
  id: number;
  onClose: () => void;
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

interface CartItem {
  cartId: string;
  id: number;
  name: string;
  price: string;
  discountPrice: string;
  size: string;
  additives: string[];
  image: string;
}

export default function Modal({ id, onClose }: ModalProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("s");
  const [selectedAdditives, setSelectedAdditives] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData(`products/${id}`, "GET");
      const data = await result.json();
      if (!result.ok) {
        console.log("API error");
      } else {
        setProduct(data.data);
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Show error modal on fetch errors
  if (!product)
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
        <div
          ref={modalRef}
          className="relative bg-[#E7D7CC] rounded-3xl p-6 sm:p-8 max-w-2xl w-[90%] shadow-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-text-dark">
            Something wrong happened with the server. Please try again.
          </h2>
        </div>
      </div>
    );

  // Calculate userPrice
  const userPrice = parseFloat(
    user
      ? selectedSize === "s"
        ? product.discountPrice ||
          product.sizes[selectedSize as keyof typeof product.sizes]
            ?.discountPrice ||
          product.price
        : product.sizes[selectedSize as keyof typeof product.sizes]
            ?.discountPrice ||
          product.sizes[selectedSize as keyof typeof product.sizes]?.price
      : product.sizes[selectedSize as keyof typeof product.sizes]?.price
  );
  const userAdditivesTotal = selectedAdditives.reduce((sum, addName) => {
    const additive = product.additives.find((a) => a.name === addName);
    if (!additive) return sum;
    return (
      sum +
      parseFloat(
        user ? additive.discountPrice || additive.price : additive.price
      )
    );
  }, 0);
  const userTotal = (userPrice + userAdditivesTotal).toFixed(2);

  // Calculate normalPrice
  const normalPrice = parseFloat(
    product.sizes[selectedSize as keyof typeof product.sizes]?.price
  );
  const additivesTotal = selectedAdditives.reduce((sum, addName) => {
    const additive = product.additives.find((a) => a.name === addName);
    if (!additive) return sum;
    return sum + parseFloat(additive.price);
  }, 0);
  const normalTotal = (normalPrice + additivesTotal).toFixed(2);

  const handleAdditiveToggle = (name: string) => {
    setSelectedAdditives((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const addToCart = (product: Product) => {
    const cartItem = {
      cartId: Date.now().toString(),
      id: product.id,
      name: product.name,
      price: normalTotal,
      discountPrice: userTotal,
      size: selectedSize,
      additives: selectedAdditives,
      image: `/assets/images/${product.category}-${product.id}.jpg`,
    };

    const cartJSON = localStorage.getItem("cart");
    let cart: CartItem[] = [];

    if (cartJSON) {
      try {
        cart = JSON.parse(cartJSON);
        if (!Array.isArray(cart)) {
          cart = [];
        }
      } catch (error) {
        console.log("fallback runs", error);
        cart = [];
      }
    }
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("updated cart: ", cart);
    window.dispatchEvent(new Event("cartUpdated")); // updates cartSize dynamically
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-grayscale-100">
      <div
        ref={modalRef}
        className="relative bg-[#E7D7CC] rounded-3xl p-6 sm:p-8 max-w-2xl w-[90%] shadow-xl"
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="shrink-0 w-full sm:w-1/2 rounded-2xl overflow-hidden">
            <img
              src={`/assets/images/${product.category}-${product.id}.jpg`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between w-full sm:w-1/2">
            <div>
              <h2 className="text-2xl font-bold text-text-dark">
                {product.name}
              </h2>
              <p className="text-gray-700 mt-2">{product.description}</p>

              {/* Sizes */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(product.sizes).map(([key, value]) => (
                    <div key={key} className="relative group">
                      {/* size btn */}
                      <button
                        onClick={() => setSelectedSize(key)}
                        className={`px-4 py-2 rounded-full transition-all ${
                          selectedSize === key
                            ? "bg-background-container text-text-light"
                            : "bg-border-light text-text-dark hover:bg-background-backdrop hover:text-text-light hover:font-semibold"
                        }`}
                      >
                        {value.size}
                      </button>

                      {/* size tooltip */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 hidden group-hover:block bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
                        {value.discountPrice &&
                        value.discountPrice !== value.price ? (
                          <>
                            <span className="line-through opacity-70 mr-1">
                              ${parseFloat(value.price).toFixed(2)}
                            </span>
                            <span className="text-text-accent font-semibold">
                              ${parseFloat(value.discountPrice).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span>${parseFloat(value.price).toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additives */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Additives</h3>
                <div className="flex flex-wrap gap-2">
                  {product.additives.map((add, index) => (
                    <div key={index} className="relative group">
                      {/* additive btn */}
                      <button
                        onClick={() => handleAdditiveToggle(add.name)}
                        className={`px-4 py-2 rounded-full transition-all ${
                          selectedAdditives.includes(add.name)
                            ? "bg-background-container text-text-light"
                            : "bg-border-light text-text-dark hover:bg-background-backdrop hover:text-text-light hover:font-semibold"
                        }`}
                      >
                        {add.name}
                      </button>

                      {/* additive tooltip */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 hidden group-hover:block bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
                        {add.discountPrice &&
                        add.discountPrice !== add.price ? (
                          <>
                            <span className="line-through opacity-70 mr-1">
                              ${parseFloat(add.price).toFixed(2)}
                            </span>
                            <span className="text-text-accent font-semibold">
                              ${parseFloat(add.discountPrice).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span>${parseFloat(add.price).toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-800 flex flex-col">
                Total:{" "}
                <span
                  className={`font-bold ${
                    user ? "line-through text-gray-400" : "text-text-accent"
                  }`}
                >
                  ${normalTotal}{" "}
                </span>
                <span
                  className={`text-text-accent font-bold ${
                    user ? "" : "hidden"
                  }`}
                >
                  ${userTotal}
                </span>
              </p>
              {user ? (
                <button
                  id="add-to-cart"
                  className="px-6 py-2 border-2 border-gray-700 rounded-full font-semibold hover:bg-gray-700 hover:text-white transition-all"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              ) : (
                <a href="login.html">
                  <button
                    id="login"
                    className="px-6 py-2 border-2 border-gray-700 rounded-full font-semibold hover:bg-gray-700 hover:text-white transition-all"
                  >
                    Login
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
