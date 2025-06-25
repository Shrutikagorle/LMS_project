import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const NavBar = () => {
  const {navigate, isEducator} = useContext(AppContext)
  const isCourseListPage = location.pathname.includes("/course-list"); /*location.pathname se current URL path check kiya ja raha hai. Agar pathname me /course-list hai toh isCourseListPage = true.

  Iska use conditional styling ke liye kiya gaya hai (background color change).*/

  const {openSignIn} = useClerk()
  const {user} = useUser()


  return (
    <div
      className={`flex w-full items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4  ${
        isCourseListPage ? "bg-white" : "bg-green-100/90"
      }`}
    >
      <img className="w-28 lg:w-32 cursor-pointer" onClick={()=> {navigate('/')}} src={assets.logo} alt="Logo" />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && 
          <>
          <button  onClick={()=>{navigate('/educator')}} className="cursor-pointer"> {isEducator ? "Educator Dashboard" : 'Become Educator' }</button> |
          <Link to="/my-enrollments"> My Enrollments </Link>
          </>}
        </div>

        { user ? <UserButton/> : <button onClick={()=> openSignIn()}className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer">
          Create Account
        </button>}
      </div>


      {/*  For Phone Screen */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
        {user && 
          <>
          <button  onClick={()=>{navigate('/educator')}} className="cursor-pointer">{isEducator ? "Educator Dashboard" : 'Become Educator' }</button> |
          <Link to="/my-enrollments"> My Enrollments </Link>
          </>}
        </div>
        {
        user ? <UserButton/>: 
        <button onClick={()=>openSignIn()}> <img src={assets.user_icon} alt="" /></button>
        }
      </div>
    </div>
  );
};

export default NavBar;
