import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";
import OurServices from "./OurServices";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const showModal = location.state?.showModal || false;

  useEffect(() => {
    if (showModal) {
      const modal = document.getElementById("my_modal_3");
      if (modal) {
        modal.showModal();
      }
    }
  }, [showModal]);
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
