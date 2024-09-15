import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItems = {
        menuId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItems),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login?",
        text: "Without login, you can't add products to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/", { state: { from: location, showModal: true } });
        }
      });
    }
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
          <button
            onClick={() => handleAddToCart(item)}
            className="btn bg-green"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
