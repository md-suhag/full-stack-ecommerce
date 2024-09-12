import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Cards = ({ item }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div className="card bg-base-100 w-11/12 m-4 shadow-xl relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4  bg-green heartStar ${
          isHeartFilled ? "text-rose-500 " : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="size-5 cursor-pointer " />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 "
          />
        </figure>
      </Link>

      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5>
            <span className="text-red">$ </span>
            {item.price}
          </h5>
          <button className="btn bg-green">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
