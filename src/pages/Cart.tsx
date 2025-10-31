import { fetchData } from "../api/fetchData";

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

interface OrderItem {
  productId: number;
  size: string;
  additives: string[];
  quantity: number;
}

interface Order {
  items: OrderItem[];
  totalPrice: number;
}

function itemRemove(cartItem: CartItem) {
  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] | null = storedCart ? JSON.parse(storedCart) : null;
  console.log(cartItem);
  const newCart = JSON.stringify(
    cart?.filter((item) => item.cartId != cartItem.cartId)
  );
  if (newCart?.length != 0) {
    localStorage.setItem("cart", newCart);
  } else {
    localStorage.removeItem("cart");
  }
  window.location.reload();
}

async function orderCart(discountTotal: number): Promise<void> {
  const items: OrderItem[] = [];
  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] | null = storedCart ? JSON.parse(storedCart) : null;

  cart?.forEach((cartItem: CartItem) => {
    const additives: string[] = [];
    cartItem.additives.forEach((add) => additives.push(add));
    const orderItem: OrderItem = {
      productId: Number(cartItem.id),
      size: cartItem.size,
      additives: additives,
      quantity: 1,
    };
    items.push(orderItem);
  });

  const order: Order = {
    items: items,
    totalPrice: Number(discountTotal.toFixed(2)),
  };

  try {
    const response = await fetchData("orders/confirm", "POST", order);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to place order");
    }

    // localStorage.removeItem("cart");
    alert("Order placed successfully! Thank you for your purchase.");
    // window.location.reload();
  } catch (err) {
    alert(
      err instanceof Error
        ? err.message
        : "Failed to place order. Please try again."
    );
  }
}

export default function Cart() {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const storedCart = localStorage.getItem("cart");
  const cart: CartItem[] | null = storedCart ? JSON.parse(storedCart) : null;

  let noramlTotal = 0;
  let discountTotal = 0;

  cart?.forEach((item: CartItem) => {
    noramlTotal += Number(item.price);
    discountTotal += Number(item.discountPrice);
  });

  return (
    <div className="flex flex-col items-center justify-center text-sx sm:text-xl text-text-dark">
      <div className="text-5xl font-bold mb-8">Cart</div>

      <div className="hidden">
        Order placed successfully! Thank you for your purchase.
      </div>

      <div className="min-h-48 flex flex-col w-full mb-6 gap-5 lg:w-3/4">
        {cart
          ? cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-full border-b border-border-light pb-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="group cursor-pointer hover:scale-110 transition-transform"
                    id={item.cartId}
                    onClick={() => itemRemove(item)}
                  >
                    <svg
                      className="w-6 h-6 stroke-[#403F3D] group-hover:stroke-red-700 transition-colors"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" />
                      <path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" />
                    </svg>
                  </div>

                  <div className="w-32 h-32">
                    <img
                      className="rounded-2xl"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div>
                    <div>{item.name}</div>
                    <div className="text-sm">
                      {item.size}, {item.additives.join(", ")}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-self-end">
                  <div>Price</div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold text-lg">
                      ${item.discountPrice}
                    </div>
                    <div className="line-through text-text-accent">
                      ${item.price}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>

      <div className="grid w-full gap-2 lg:w-3/4">
        <div className="grid grid-cols-2">
          <div className="justify-self-start">Total:</div>
          <div className="justify-self-end">
            <span className="px-4">${String(discountTotal.toFixed(2))}</span>
            <span className="line-through text-text-accent">
              ${String(noramlTotal.toFixed(2))}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="justify-self-start">Address:</div>
          <div className="justify-self-end" id="address">
            {user ? `${user.city}, ${user.street}, ${user.houseNumber}` : ""}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="justify-self-start">Pay by:</div>
          <div className="justify-self-end" id="method">
            {user
              ? `${
                  user.paymentMethod.charAt(0).toUpperCase() +
                  user.paymentMethod.slice(1)
                }`
              : ""}
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full gap-6 mt-10 justify-center">
        <button
          className={`w-sm border border-border-dark rounded-3xl p-2 transition-all duration-300 ease-in-out hover:bg-background-container hover:text-text-light ${
            user ? "hidden" : ""
          }`}
          onClick={() => {
            window.location.href = "login.html";
          }}
        >
          Sign In
        </button>
        <button
          className={`w-sm border border-border-dark rounded-3xl p-2 transition-all duration-300 ease-in-out hover:bg-background-container hover:text-text-light ${
            user ? "hidden" : ""
          }`}
          onClick={() => {
            window.location.href = "register.html";
          }}
        >
          Registration
        </button>
        <button
          className={`w-sm border border-border-dark rounded-3xl p-2 transition-all duration-300 ease-in-out hover:bg-background-container hover:text-text-light ${
            user && cart?.length != 0 ? "" : "hidden"
          }`}
          onClick={() => orderCart(discountTotal)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
