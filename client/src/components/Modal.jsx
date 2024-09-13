import { BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currentState, setCurrentState] = useState("Login");
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login, createUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(data);
    currentState === "Login"
      ? login(email, password)
          .then((result) => {
            const user = result.user;
            alert("Login successfull!");
            document.getElementById("my_modal_3").close();
          })
          .catch((error) => {
            setErrorMessage("Provide a correct email and password!");
          })
      : createUser(email, password)
          .then((result) => {
            const user = result.user;
            alert("Account creation successfull!");
            document.getElementById("my_modal_3").close();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message);
          });
  };

  // google login

  const handleGoogleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        document.getElementById("my_modal_3").close();
        alert("login successfull ");
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_3" className="modal ">
      <div className="modal-box p-0">
        <form method="dialog ">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl text-center">{currentState}</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: "email is required" })}
            />
          </div>
          {errors.email && (
            <p className="block w-full text-center text-rose-500">
              {errors.email.message}
            </p>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          {errors.password && (
            <p className="block w-full text-center text-rose-500">
              {errors.password.message}
            </p>
          )}

          {/* error  */}

          {errorMessage ? (
            <p className="text-red text-xs italic">{errorMessage}</p>
          ) : (
            ""
          )}

          {/* login btn  */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value={currentState === "Login" ? "Login" : "Signup"}
              className="btn bg-green text-white"
            />
          </div>
          {currentState === "Login" ? (
            <p className="text-center mt-2">
              Don't have an account{" "}
              <span
                onClick={() => setCurrentState("Signup")}
                className="text-red underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-center mt-2">
              Already have an account{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-red underline cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
        </form>
        <p className="text-center">Sign in with social account</p>
        {/* social sign in  */}
        <div className="flex justify-center gap-1 m-2">
          <button className="btn btn-circle" onClick={handleGoogleLogin}>
            <AiOutlineGoogle />
          </button>
          <button className="btn btn-circle">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle">
            <BsGithub />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
