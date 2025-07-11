import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestamonialSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi
        fugiat modi voluptates architecto ullam? Soluta dolorum at, harum ab
        consectetur <br />
        labore accusamus vitae facilis enim commodi alias aut ea!
      </p>
      <div className=" grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/18 overflow-hidden"
            key={index}
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
              <img
                className="h-12 w-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
              
            </div>
            <div className="p-5 pb-7">
                <div className="flex gap-0.5 ">
                  {[...Array(5)].map((_, i) => (
                      <img
                        className="h-5"
                        key={i}
                        src={
                          i < Math.floor(testimonial.rating)
                            ? assets.star
                            : assets.star_blank
                        }
                        alt=""
                      />
                    ))
                  }
                </div>
                <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
              </div>
              <a href="#" className="text-blue-500 underline  px-5">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TestamonialSection;

//   <div className="pb-14 px-8 md:px-0">
//     <h2 className="text-3xl font-medium text-gray-800">Testamonials</h2>
//     <p className="md:text-base text-gray-500 mt-3">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil commodi
//       optio id sint nesciunt, perferendis saepe placeat fugiat assumenda
//       sapiente ut necessitatibus porro rerum dicta error et, <br />
//       excepturi ex maiores!
//     </p>
//     <div>
//       {dummyTestimonial.map((testimonial, index) => (
//         <div key={index}>

//           <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
//             <img
//               className="h-12 w-12 rounded-full"
//               src={testimonial.image}
//               alt={testimonial.name}
//             />

//           <div>
//             <h1 className="text-lg font-medium text-gray-800">
//               {testimonial.name}
//             </h1>
//             <p className="text-gray-800/80">{testimonial.role}</p>
//           </div>
//           <div className="p-5 pb-7">
//             <div className="flex gap-0.5 ">
//               {[
//                 ...Array(5).map((_, i) => (
//                   <img
//                     className="h-5"
//                     key={i}
//                     src={
//                       i < Math.floor(testimonial.rating)
//                         ? assets.star
//                         : assets.star_blank
//                     }
//                     alt="star"
//                   />
//                 ))
//               ]}
//             </div>
//             <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );
