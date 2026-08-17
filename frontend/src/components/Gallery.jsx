// import { useEffect, useState } from "react";
// import { IoIosArrowDropdown } from "react-icons/io";

// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [visibleSections, setVisibleSections] = useState({});

//   const handleArrow = (id) => {
//     setVisibleSections((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const fetchGallery = async () => {
//     try {
//       const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/getusers`);
//       const data = await response.json();
//       setImages(data);
//     } catch (error) {
//       console.error(`Error fetching gallery: ${error}`);
//     }
//   };

//   return (
//     <>
//       {images.map((image) => (
//         <div
//           key={image.id}
//           className="min-w-min mx-14 mt-6 flex flex-col font-Basic bg-gray-100 rounded-3xl"
//         >
//           <div className="flex justify-between items-center mx-10 my-7 cursor-pointer">
//             <p className="text-3xl">{image.title}</p>
//             <IoIosArrowDropdown
//               size={30}
//               onClick={() => handleArrow(image._id)}
//               className={`transition-transform duration-300 ${visibleSections[image._id] ? "rotate-180" : "rotate-0"
//                 }`}
//             />
//           </div>

//           {!visibleSections[image._id] && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
//               {image.link.map((imgUrl, index) => (
//                 <div key={index} className="w-full aspect-auto">
//                   <img
//                     src={imgUrl}
//                     alt={`${image.title} ${index + 1}`}
//                     className="w-full h-full object-cover rounded-2xl"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

// export default Gallery;

import { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [visibleSections, setVisibleSections] = useState({});

  const handleArrow = (id) => {
    setVisibleSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const apiUrl = "https://aarogya-7put.onrender.com";
      const response = await fetch(`${apiUrl}/api/gallery`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  return (
    <>
      {images.map((image) => (
        <div
          key={image._id}
          className="min-w-min mx-14 mt-6 flex flex-col font-Basic bg-gray-100 rounded-3xl"
        >
          <div
            className="flex justify-between items-center mx-10 my-7 cursor-pointer"
            onClick={() => handleArrow(image._id)}
          >
            <p className="text-3xl">{image.title}</p>

            <IoIosArrowDropdown
              size={30}
              className={`transition-transform duration-300 ${visibleSections[image._id]
                  ? "rotate-180"
                  : "rotate-0"
                }`}
            />
          </div>

          {!visibleSections[image._id] && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
              {image.link.map((imgUrl, index) => (
                <div key={index} className="w-full aspect-[4/3]">
                  <img
                    src={imgUrl}
                    alt={`${image.title} ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Gallery;