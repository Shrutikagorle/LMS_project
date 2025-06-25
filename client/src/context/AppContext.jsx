import React, { useEffect, useState } from "react";
import { createContext } from "react"; //ek React function hai jo ek Context object banata hai.
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext(); //ek global state container ki tarah kaam karta hai jisse multiple components data access kar sakte hain. Iska matlab ye hai ki ab hum AppContext ko use karke kisi bhi component mein shared state access kar sakenge.

export const AppContextProvider = (props) => {
  // AppContextProvider ek wrapper component hai jo state provide karega.
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrollCourses] = useState([]);
  //fetch all courses

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  //Function to clculate average rating of course

  const calculateRating =(course)=>{
    if(course.courseRatings.length === 0){
      return 0;
    }
    let totalRating =0
    course.courseRatings.forEach(rating =>{
      totalRating += rating.rating
    })
    return totalRating / course.courseRatings.length
  }

  // function to calculate course chapter time 
const calculateChapterTime =(chapter)=>{
  let time = 0;
  chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
  return humanizeDuration(time * 60 * 1000, {units:['h', 'm']})
}

 // function to calculate course duration
 const calculateCourseDuration =(course ={courseContent:[]})=>{
  let time = 0
  course.courseContent.map((chapter)=>chapter.courseContent?.map(
    (lecture)=> (time+= lecture.lectureDuration)
  ))
  return humanizeDuration(time * 60 * 1000, {units:['h', 'm']})
  
 } 

 // function to calculate number of lrctures in the course
 const calculateNumOfLectures =(course)=>{
  let totalLectures =0;
  course.courseContent.forEach(chapter =>{
    if(Array.isArray(chapter.chapterContent)){
      totalLectures+= chapter.chapterContent.length
    }
  });
  return totalLectures;
 }

 //Fetch User Enrolled Courses
 const fetchUserEnrolledCourses = async()=>{
  setEnrollCourses(dummyCourses)
 }

  useEffect(() => {
    fetchAllCourses()
    fetchUserEnrolledCourses()
  }, []);
  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses


  }; // value Yeh object shared data store karega, ek object hai jisme hum global state store kar sakte hain
  return (
    <AppContext.Provider value={value}>
      {
        props.children /* props.children //ka matlab hai ki jo bhi components AppContextProvider ke andar wrapped honge, unko context ka data milega */
      }
    </AppContext.Provider> //AppContext.Provider ka use hota hai taaki uske andar jo bhi components ho wo value access kar sake.
  );
};
