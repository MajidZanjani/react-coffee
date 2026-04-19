import About from "../components/About";
import { Carousel } from "../components/Carousel";
import Hero from "../components/Hero";
import MobileApp from "../components/MobileApp";

export default function Home() {
  return (
    <div className="text-center mt-0">
      <section id="home">
        <Hero />
      </section>
      <section id="carousel">
        <Carousel />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="apps">
        <MobileApp />
      </section>
    </div>
  );
}
