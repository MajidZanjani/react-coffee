export default function About() {
  return (
    <div className="pt-10">
      <h2 className="font-inter font-bold text-2xl md:text-6xl md:leading-16 p-5 text-text-dark">
        <span>Resource is </span>
        <span className="text-text-accent italic">
          the perfect and cozy place{" "}
        </span>
        <span>
          where you can enjoy a variety of hot beverages, relax, catch up with
          friends, or get some work done.
        </span>
      </h2>

      <div
        className="
          grid 
          grid-cols-2 
          gap-4 
          auto-rows-[60fr_40fr] 
          md:h-[1400px]
        "
      >
        {/* Column 1 */}
        <div className="grid grid-rows-[60fr_40fr] gap-4">
          <div className="overflow-hidden relative rounded-3xl">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover scale-110 transition duration-700 ease-in-out hover:scale-100"
              src="assets/images/about-1.jpg"
              alt="About 1"
            />
          </div>
          <div className="overflow-hidden relative rounded-3xl">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover scale-110 transition duration-700 ease-in-out hover:scale-100"
              src="assets/images/about-2.jpg"
              alt="About 2"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="grid grid-rows-[40fr_60fr] gap-4">
          <div className="overflow-hidden relative rounded-3xl">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover scale-110 transition duration-700 ease-in-out hover:scale-100"
              src="assets/images/about-3.jpg"
              alt="About 3"
            />
          </div>
          <div className="overflow-hidden relative rounded-3xl">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover scale-110 transition duration-700 ease-in-out hover:scale-100"
              src="assets/images/about-4.jpg"
              alt="About 4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
