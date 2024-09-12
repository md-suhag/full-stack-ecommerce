import React from "react";
import bannerImg from "/images/home/banner.png";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA ] from-0% to-[#FCFCFC ] to-100%">
      <div className="py-6 flex flex-col  md:flex-row-reverse justify-between items-center gap-8">
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
          <div className="flex flex-col lg:flex-row items-center justify-around -mt-14 gap-4">
            <div className="flex  bg-white py-2 px-3 rounded-2xl items-center gap-2 shadow-md ">
              <img
                src="/images/home/b-food1.png"
                alt=""
                className="rounded-2xl"
              />
              <div className="space-y-1">
                <h5 className="font-medium mb-1">Spicy noodles</h5>
                <div className="rating lg:w-20">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
            <div className="hidden lg:flex  bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md ">
              <img
                src="/images/home/b-food1.png"
                alt=""
                className="rounded-2xl"
              />
              <div className="space-y-1">
                <h5 className="font-medium mb-1">Spicy noodles</h5>
                <div className="rating lg:w-20">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 !space-y-7 px-4">
          <h2 className="text-4xl md:text-5xl font-bold !leading-snug">
            Dive into Delights Of Delectable{" "}
            <span className="text-green"> Food</span>
            <p className="text-xl font-normal text-[#4a4a4a]">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            <button className="btn bg-green px-6 py-3 font-semibold rounded-full">
              Order Now
            </button>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
