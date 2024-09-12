import React from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";
import OurServices from "./OurServices";

const Home = () => {
  return (
    <main>
      <Banner />
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <OurServices />
    </main>
  );
};

export default Home;
