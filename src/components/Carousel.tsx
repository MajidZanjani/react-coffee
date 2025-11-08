import { useState, useEffect, useRef } from "react";
import { fetchData } from "../api/fetchData";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  discountPrice: number;
}

const slides = [
  "/assets/images/coffee-slider-1.png",
  "/assets/images/coffee-slider-2.png",
  "/assets/images/coffee-slider-3.png",
];

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  const startAutoSlide = () => {
    stopAutoSlide(); // clear existing interval
    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current !== undefined) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    // return stopAutoSlide; // cleanup on unmount
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoSlide();
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  const [favCoffees, setFavCoffees] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const defaultFavs: Product[] = [
        {
          id: 9,
          name: "S'mores Frappuccino",
          category: "coffee",
          description:
            "Espresso mixed with brown sugar and cinnamon topped with oat milk.",
          price: 5.5,
          discountPrice: 5.5,
        },
        {
          id: 10,
          name: "Caramel Macchiato",
          category: "coffee",
          description: "Espresso with rich caramel-peanut syrup.",
          price: 5.0,
          discountPrice: 5.0,
        },
        {
          id: 11,
          name: "Ice coffee",
          category: "coffee",
          description: "Prepared from coffee, milk and ice.",
          price: 4.5,
          discountPrice: 4.5,
        },
      ];

      try {
        const result = await fetchData("products/favorites", "GET");

        if (!result.ok) {
          console.log(
            "there is an error happening with api. default coffees show.."
          );
          setFavCoffees(defaultFavs);
          return;
        }
        const data = await result.json();
        setFavCoffees(data.data);
      } catch (err) {
        console.error("Network or parsing error:", err);
        setFavCoffees(defaultFavs);
      }
    };
    loadData();
  }, []);

  return (
    <div className="w-full mt-15">
      <h1 className="font-inter font-bold text-xl sm:text-2xl md:text-4xl lg:text-6xl text-text-dark mb-4 text-center">
        <span>Choose your</span>
        <span className="text-text-accent italic"> favorite </span>
        <span>coffee</span>
      </h1>

      {/* Carousel container */}
      <div className="relative w-full overflow-hidden rounded-lg h-[260px] sm:h-[380px] md:h-[400px] lg:h-[500px] xl:h-[550px]">
        <div className="flex items-center justify-center">
          {favCoffees?.map((coffee: Product, i) => (
            <div
              key={i}
              className={`absolute font-inter font-bold h-5/6 text-xl justify-items-center top-0 left-0 w-full transition-opacity duration-700 ease-in-out ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={`/assets/images/fav-${coffee.id}.png`}
                alt={`Slide ${i + 1}`}
                className="h-5/6 rounded-4xl block mx-auto"
              />
              <h2 className="mt-3">{coffee.name}</h2>
              <h3 className="font-normal text-lg hidden sm:block mx-auto">
                {coffee.description}
              </h3>
              <h2 className="font-normal text-lg sm:font-bold sm:text-xl">
                ${coffee.price}
              </h2>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-1 lg:bottom-10 left-1/2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-10 h-2 rounded-full transition-colors ${
                i === current
                  ? "bg-text-accent opacity-100"
                  : "bg-border-dark opacity-20"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev btn */}
        <button
          onClick={prevSlide}
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-text-dark/50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </button>

        {/* Next btn */}
        <button
          onClick={nextSlide}
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-text-dark/50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
