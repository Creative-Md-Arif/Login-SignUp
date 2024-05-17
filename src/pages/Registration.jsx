/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  const auth = getAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // sign up
  
  // Error
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  // const [message, setMessage] = useState(null);
  const navigate = useNavigate();





  const handleSubmit = () => {


   if(name == ""){
    toast.error("Name is required");
   } else if(email == ""){
    toast.error("Email is required");
   } else if(password == ""){
    toast.error("Password is required");
   } else {
   
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
     // console.log(user);
       sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success("Registration Successfully! Verification email sent! Please check your inbox.");
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Navigate to login after 3 seconds
      })
      .catch((error) => {
        if (error.code === 'auth/too-many-requests') {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error("Error sending verification email: " + error.message);
        }
      });
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        toast.error("The email address is already in use by another account.");
      } else if (error.code === 'auth/invalid-email') {
        toast.error("The email address is not valid.");
      } else if (error.code === 'auth/operation-not-allowed') {
        toast.error("Email/Password accounts are not enabled.");
      } else if (error.code === 'auth/weak-password') {
        toast.error("The password is too weak.");
      } else {
        toast.error("Error: " + error.message);
      }

      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error code:", errorCode, "Error message:", errorMessage);
      // ..
    });
   }





   
  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer/>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <div className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value), setNameErr("");
                  }}
                  type="text"
                  id="Your-name"
                  name="Your-Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Name"
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Email
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value), setEmailErr("");
                  }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Example@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value), setPasswordErr("");
                  }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 dark:text-gray-300">
                    I accept the
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
