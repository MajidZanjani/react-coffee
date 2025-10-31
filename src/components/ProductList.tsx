import { useState } from "react";
import Modal from "./Modal";

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

interface ProductListProps {
  products: Product[];
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

export default function ProductList({ products }: ProductListProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedId(product.id)}
            className="group flex flex-col justify-between border border-border-light rounded-2xl p-4 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-full h-60 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-xl">
              <img
                src={`/assets/images/${product.category}-${product.id}.jpg`}
                alt={product.name}
                className="w-full h-full object-cover scale-110 transition-transform duration-500 ease-in-out group-hover:scale-100"
              />
            </div>
            <div className="flex flex-col grow mt-3">
              <h2 className="my-2 font-bold text-text-dark text-xl">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
            <div className="font-semibold text-text-accent mt-3">
              <div
                className={`${
                  product.discountPrice && user
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                ${product.price}
              </div>
              <div
                className={`${product.discountPrice && user ? "" : "hidden"}`}
              >
                ${product.discountPrice}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedId !== null && (
        <Modal id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
