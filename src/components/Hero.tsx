export default function Hero() {
  return (
    <div className="relative rounded-4xl text-left overflow-hidden max-h-160">
      <video autoPlay muted loop playsInline className="">
        <source
          src="https://www.pexels.com/ru-ru/download/video/2909914/"
          type="video/mp4"
        />
      </video>
      <div className="absolute top-0 xl:left-20 sm:top-10 md:top-0 md:leading-10 lg:top-10 text-text-light px-10 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="pt-4 xs:pt-10 font-bold xs:text-2xl md:text-5xl lg:text-6xl xl:text-7xl">
          <span className="text-text-accent italic">Enjoy </span>
          <span className="">premium coffee at our charming cafe</span>
        </h1>
        <div className="hidden md:flex mt-2 xl:my-5 2xl:my-10 2xl:w-2/3 px-5 py-2 text-sm xl:text-lg text-text-light tracking-wide rounded-2xl">
          With its inviting atmosphere and delicious coffee options, the Coffee
          House Resource is a popular destination for coffee lovers and those
          seeking a warm and inviting space to enjoy their favorite beverage.
        </div>

        <a href="menu.html" className="content-center">
          <div className="mt-3 h-8 pt-1 md:h-12 w-full sm:w-full md:w-2xs xl:mt-10 xl:w-60 text-text-dark bg-background-body group rounded-4xl flex justify-center">
            <div className="flex flex-row gap-2">
              Menu
              <img
                src="/assets/images/coffee-cup.png"
                alt="coffee-cup"
                className="h-6 w-6 md:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
