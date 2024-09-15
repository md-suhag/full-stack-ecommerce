import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const Cart = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrease = async (item) => {
    console.log(item);
    await fetch(`http://localhost:3000/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      });
    refetch();
  };
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      await fetch(`http://localhost:3000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          setCartItems(updatedCart);
        });
      refetch();
    } else {
      alert("item cant't be 0");
    }
  };
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;
  return (
    <div className="section-container">
      <div className="mt-10 bg-gradient-to-r from-[#FAFAFA ] from-0% to-[#FCFCFC ] to-100%">
        <div className="py-28 flex flex-col  md:flex-row-reverse justify-center items-center gap-8">
          <div className=" space-y-7 px-4">
            <h2 className="text-4xl md:text-5xl font-bold !leading-snug">
              Dive into Delights Of Delectable{" "}
              <span className="text-green"> Food</span>
            </h2>
          </div>
        </div>
      </div>
      {/* table  */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-green text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">{item.name}</td>

                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDecrease(item)}
                  >
                    {" "}
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                    className="w-10 mx-2 text-center overflow-hidden appearance-none"
                  />
                  <button
                    className="btn btn-sm"
                    onClick={() => handleIncrease(item)}
                  >
                    {" "}
                    +{" "}
                  </button>
                </td>
                <td>${calculatePrice(item).toFixed(2)}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash className="text-red" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* customer details  */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Customer Details</h3>
          {user && (
            <>
              {" "}
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
              <p>User_id: {user.uid}</p>
            </>
          )}
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Shopping Details</h3>
          <p>Total Items:{cart.length}</p>
          <p>Total Prices: ${cartSubTotal.toFixed(2)}</p>
          <button className="btn bg-green text-white">
            Procced to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
