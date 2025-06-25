import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus, libero tempora est dolores necessitatibus nesciunt non
            sunt dicta facere optio, praesentium sapiente ab nobis? Magni
            praesentium modi maxime sapiente incidunt?
          </p>
        </div>

        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>

          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact us </a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>


        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-white/80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
            temporibus vel corporis iure labore? Velit, error temporibus minima
            quasi aperiam saepe quae sed quaerat quibusdam nostrum! Ex
            voluptates mollitia architecto.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded-md px-2 text-sm"
            />
            <button className="bg-blue-600 w-24 h-9 text-white rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        All rights reserved ©
      </p>
    </footer>
  );
};

export default Footer;
