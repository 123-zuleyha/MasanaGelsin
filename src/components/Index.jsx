import React from "react";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import Header from "./Header";
import Slider from "./Slider";
import About from "./About";
import Menu from "./Menu";

function Index() {
  return (
    <>
      <Header />
      <Slider />
      <About />
      <Menu />
      <Testimonial />
      <Contact />
    </>
  );
}
export default Index;
