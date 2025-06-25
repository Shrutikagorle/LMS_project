import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-green-100/90">
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto text-xl">
        
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At a quia,
        mollitia quibusdam harum praesentium ex quod assumenda nisi aperiam nemo
        dicta dolore reprehenderit? Odit iste debitis{" "}
        <span className="text-blue-600">
          obcaecati temporibus assumenda.
        </span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>

      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis illo rerum
        ab sit nihil quisquam, officiis laboriosam eligendi neque numquam
        repellat earum, aperiam enim modi repellendus doloribus architecto
        adipisci facilis?
      </p>
      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae odio
        veritatis repellat debitis amet reprehenderit maiores est tempore
        voluptatibus quaerat? Suscipit voluptatibus enim dicta minima ducimus
        cumque quo? Doloribus, nulla!
      </p>
      <SearchBar/>
    </div>
  );
};

export default Hero;
