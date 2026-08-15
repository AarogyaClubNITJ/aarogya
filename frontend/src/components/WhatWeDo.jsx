import React, { useState } from 'react';
import what from '../assets/whatwedo/healthcamp.jpg';
import what1 from '../assets/whatwedo/healthworkshop.jpeg';
import what2 from '../assets/whatwedo/image.png';

const FlipCard = ({ frontImage, frontTitle, backTitle, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div
      className="flip-card w-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: '1000px',
        minHeight: '400px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="bg-white px-3 sm:px-5 py-4 rounded-3xl flex flex-col items-center sm:shadow-custom ring-1"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <img 
            className="rounded-3xl ring-1 w-full object-cover h-64 sm:h-48 md:h-72" 
            src={frontImage} 
            alt={frontTitle} 
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-6 md:mt-10 text-center">
            {frontTitle}
          </h2>
          <p className="mt-2 sm:mt-4 text-gray-500 text-xs sm:text-sm italic">
            
          </p>
        </div>
        
        {/* Back of card */}
        <div
          className="bg-blue-600 text-white px-4 sm:px-6 py-4 sm:py-6 rounded-3xl flex flex-col sm:shadow-custom ring-1"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            overflowY: 'auto'
          }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{backTitle}</h3>
          <div className="flex-grow overflow-auto">
            <p className="text-white text-sm sm:text-base leading-relaxed">{backContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhatWeDo = () => {
  const cardData = [
    {
      id: 1,
      frontTitle: "Blood Donation Camps",
      backTitle: "Join Our Blood Donation Initiative",
      backContent: "Every donation can save up to three lives! Our blood donation camps are organized regularly to help meet the constant need for blood supplies in hospitals and emergency situations. Donation takes only 10-15 minutes, and we provide a free health check-up with every donation. Refreshments are provided for all donors, along with a certificate of appreciation. Next camp: First Sunday of every month.",
      image: what1
    },
    {
      id: 2,
      frontTitle: "Health Workshops",
      backTitle: "Health Education Programs",
      backContent: "Our health workshops aim to educate and empower participants on essential health practices, mental wellness, and preventive care, fostering a culture of well-being and awareness within the campus community. Join us for interactive sessions led by healthcare professionals and gain valuable knowledge to improve your daily health habits.",
      image: what2
    },
    {
      id: 3,
      frontTitle: "Health Checkup Camps",
      backTitle: "Comprehensive Health Screenings",
      backContent: "The Aarogya Club at NIT Jalandhar regularly organizes health checkup camps, providing essential screenings and consultations to promote well-being across campus. Our camps offer vital health metrics including blood pressure, BMI, blood sugar, and vision testing. Early detection of health issues can save lives - participate in our next camp scheduled for the end of this month.",
      image: what
    }
  ];

  return (
    <div id="goals" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="rounded-3xl px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 flex justify-center flex-col items-center">
        {/* Title */}
        <div className='relative'>
          <h2 className="absolute text-4xl sm:text-5xl lg:text-7xl font-bold text-[#406ED5]">
            WHAT WE DO
          </h2>
          <h2 id='stroke1' className="mx-[2px] text-4xl sm:text-5xl lg:text-7xl font-bold text-[#808080]">
            WHAT WE DO
          </h2>
        </div>
        
        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 w-full">
          {cardData.map((card) => (
            <FlipCard
              key={card.id}
              frontImage={card.image}
              frontTitle={card.frontTitle}
              backTitle={card.backTitle}
              backContent={card.backContent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;