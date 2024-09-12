import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import Cards from "../../components/Cards";
import {} from "react-icons/fa6";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const simplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
    >
      Back
    </div>
  );
};
const simpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
    >
      Next
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);
  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
      });
  }, []);

  const settings = {
    gap: 20,
    dots: true,
    infinite: true,
    autoplay: true,

    autoplaySpeed: 2000,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2,
      //       initialSlide: 2,
      //     },
      //   },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <simpleNextArrow />,
    prevArrow: <simplePrevArrow />,
  };
  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[520px]">Stanout Dishes From Our Menu</h2>
      </div>
      {/* arrow btn  */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          className="btn p-2 rounded-full ml-5"
          onClick={() => slider?.current?.slickPrev()}
        >
          <FaAngleLeft className="size-8 p-1" />
        </button>
        <button
          className="btn p-2 rounded-full ml-5"
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight className="size-8 p-1" />
        </button>
      </div>
      <Slider ref={slider} {...settings} className="overflow-hidden  mt-10">
        {recipes.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;
