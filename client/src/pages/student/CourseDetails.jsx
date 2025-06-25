import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumOfLectures,
    currency
  } = useContext(AppContext);

  
  

  const [loading, setLoading] = useState(true); // Added loading state

  const fetchCourseData = async () => {
    if (!allCourses || allCourses.length === 0) return;

    setLoading(true); // Start loading
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse || {});
    setLoading(false);
  };

  useEffect(() => {
    if (allCourses && allCourses.length > 0 && id) {
      fetchCourseData();
    }
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-[500px] -z-[-1] bg-gradient-to-b from-green-100/90"></div>
        {/* Left Coulmn*/}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-[44px] text-[36px] font-semibold text-gray-800">
            {courseData.courseTitle || "Course Not Found"}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription
                ? courseData.courseDescription.slice(0, 200)
                : "No description available.",
            }}
          ></p>


          {/* review and ratings */}


          <div className="flex items-center space-x-2 pt-2 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>

            <p className="text-blue-500">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"}){" "}
            </p>
            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>

          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Shrutika Gorle
            </span>
          </p>


          <div className="pt-8 text-gray-800">


            {/*Course structure section */}

            
            <h2 className="text-xl font-semibold"> Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => {
                return (
                  <div
                    key={index}
                    className="border border-gray-300 bg-white mb-2 rounded"
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center gap-2">
                        <img src={assets.down_arrow_icon} alt="arrow_icon" className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}/>
                        <p className="font-medium md:text-base text-sm">
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className="text-sm md:text-default">
                        {chapter.chapterContent.length} lectures -{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSections[index] ? "max-h-96" : "max-h-0"
                      } `}
                    >
                      <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                        {chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className="flex items-start gap-2 py-1">
                            <img
                              src={assets.play_icon}
                              alt="play_icon"
                              className="w-4 h-4 "
                            />
                            <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-2">
                                {lecture.isPreviewFree && (
                                  <p onClick={()=>setPlayerData({videoId: lecture.lectureUrl.split('/').pop()})}className="text-blue-500 cursor-pointer">
                                    Preview
                                  </p>
                                )}
                                <p>
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    { units: ["h", "m"] }
                                  )}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="py-10 text-sm md:text-[15px]">
            <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
            <p
            className="pt-3 rich-text"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription}}
          ></p>
            
          </div>


        </div>
        {/* Right Column */}
        <div className="max-w-[590px] z-10 shadow-[0px_4px_15px_0px] rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
          
        {
                playerData ? <YouTube videoId={playerData.videoId} opts= {{playerVars: {autoplay: 1}}} iframeClassName="w-full aspect-video"/> : <img src={courseData.courseThumbnail} alt=""  className=""/>
              }
          
          <div className="p-5">
            <div className="flex items-center gap-2">

              
            <img className="w-3.5" src={assets.time_left_clock_icon} alt="time left clock icon" />
              <p className="text-red-500"><span className="font-medium">5 days</span> left at this Price!</p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice /100).toFixed(2)}</p>
              <p className="md:text-lg text-gray-500 line-through">{currency}{courseData.coursePrice}</p>
              <p className="text-gray-500 md:text-lg">{courseData.discount}% off</p>
            </div>

            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>15 hr 40 min</p> <p>{calculateCourseDuration(courseData) }</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="clock icon" />
                <p>{calculateNumOfLectures(courseData) 
                
                  } Lessons</p>
              </div>

              

            </div>
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium cursor-pointer">{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
            <div className="pt-6">
              <p className="md:text-xl trext-lg font-medium text-gray-800">What's in your course?</p>
              <ul className="ml-4 pt-2 text-sm list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;

/*🎯 CourseDetails.jsx Ka Purpose
Yeh React component ek specific course ka detailed 
page render karta hai. Jab koi user Home page se kisi 
course pe click karta hai, toh woh course ka detail page dekh sakta hai.

Iska workflow kuch aisa hai: 
1️⃣ URL se course ka id le lo (useParams() ka use karke).
2️⃣ Context (AppContext) se sabhi courses ki list lo. 
3️⃣ Us list me se ek course dhoondo jiska id match kare. 
4️⃣ Agar match milta hai, toh course ka data render kar do, 
warna loading ya error dikhai do.

Step-by-Step Explanation
✅ 1️⃣ Imports & Setup
Sabse pehle hum React ka useState, useEffect, useContext import karte hain. Yeh hooks component ke state aur lifecycle handle karne ke liye use hote hain.

js
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
✅ useParams() → React Router se URL ke parameters (jaise id) ko access karne ke liye. ✅ useContext(AppContext) → Context API se global state (allCourses) ko access karne ke liye. ✅ Loading Component → Jab data load ho raha ho tab loading animation dikhane ke liye.

✅ 2️⃣ Extracting URL Parameters (id)
Jab koi user kisi course pe click karta hai, toh URL kuch aisa hota hai:

http://example.com/course/123
Iss URL se course ka id extract karne ke liye hum useParams() ka use karte hain:

js
const { id } = useParams();
✅ Agar URL /course/456 ho, toh id = "456" hoga. ✅ Yeh id baad me use hoga specific course dhoondhne ke liye.

✅ 3️⃣ State Setup
js
const [courseData, setCourseData] = useState(null);
const [loading, setLoading] = useState(true);
✅ courseData → Yeh state specific course ka data store karega. ✅ loading → Yeh state track karega ki data load ho raha hai ya load ho chuka hai.

✅ 4️⃣ Context API se Courses Ka Data Lena
js
const { allCourses } = useContext(AppContext);
✅ allCourses Context API ke through pura courses ka data aata hai. ✅ Yeh sabhi courses ka array hota hai jisme multiple course objects hote hain. ✅ Hume sirf ek course dhoondhna hai jiska id match kare.

✅ 5️⃣ fetchCourseData() Function – Specific Course Dhoondhna
js
const fetchCourseData = () => {
  if (!allCourses || allCourses.length === 0) return; // Agar courses list empty ho, toh kuch mat karo
  
  setLoading(true);  // Loading start karo
  const findCourse = allCourses.find(course => course._id === id);  // Matching course dhoondo
  setCourseData(findCourse || null);  // Agar course mila toh set karo, warna null
  setLoading(false);  // Loading stop karo
};
🚀 Ye function kya karta hai? ✔ Check karta hai ki courses loaded hain ya nahi. ✔ find() method se matching id wala course dhoondhta hai. ✔ setCourseData(findCourse || null) se course ko store karta hai. ✔ Loading state ko update karta hai taaki smooth transition ho.

✅ 6️⃣ useEffect() – Data Load Hone Ka Mechanism
js
useEffect(() => {
  if (allCourses && allCourses.length > 0 && id) {
    fetchCourseData();
  }
}, [allCourses, id]);
🚀 Ye useEffect() kab trigger hota hai? ✔ Jab allCourses available hote hain ya jab id change hota hai. ✔ Yeh ensure karta hai ki jab bhi user koi doosra course select kare, toh naye course ka data load ho. ✔ Agar allCourses abhi load nahi hue toh pehle context se data aane ka wait karega.

✅ 7️⃣ Rendering Logic (Conditional UI)
Agar data abhi loading ho raha hai, toh Loading component dikhana hai:

js
return loading ? <Loading /> :
✔ Agar loading === true, toh <Loading /> dikhai dega. ✔ Agar data load ho gaya, tabhi course ki details render hogi.

✅ 8️⃣ UI Layout – Course Details Display
js
return loading ? (
  <Loading />
) : courseData ? (
  <>
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
      
      <div className="absolute top-0 left-0 w-full h-[500px] z-[-1] bg-gradient-to-b from-green-100/90"></div>
      
      {/* Left Column - Course Details 
      <div className="max-w-xl z-10 text-gray-500">
        <h1 className="md:text-[44px] text-[36px] font-semibold text-gray-800">
          {courseData.courseTitle || "Course Not Found"}
        </h1>
        <p dangerouslySetInnerHTML={{
          __html: courseData.courseDescription ? courseData.courseDescription.slice(0, 200) : "No description available."
        }}></p>
      </div>

      {/* Right Column - Additional Content 
      <div></div>
    </div>
  </>
) : (
  <div className="text-center text-gray-500">Course Not Found</div>
);
🚀 Ye UI kaise render hoti hai? ✔ Agar loading true hai, toh <Loading /> dikhai dega. ✔ Agar courseData available hai, toh title + description dikhai degi. ✔ Agar courseData null hai, toh "Course Not Found" message show hoga.

✅ 9️⃣ Default Export
js
export default CourseDetails;
🚀 Yeh Component Ko Export Karta Hai Taaki Doosri Files Use Kar Sake ✔ Yeh CourseDetails.jsx ko React Router se call kiya ja sake. ✔ Yeh App.js me Route ke through accessible hota hai.



*/
