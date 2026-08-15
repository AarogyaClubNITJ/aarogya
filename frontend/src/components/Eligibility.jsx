import React, { useState } from 'react';

const can = [
  "Are between 18 to 65 years old",
  "Weigh over 50kgs or 110Lbs",
  "Are in good health",
  "Have not donated blood in last three months",
  "Hemoglobin levels are normal",
  "Had your last meal within the last four hours"
];

const cannot = [
  "Have donated blood in last three months",
  "Have cold, flu, or any other active infection",
  "Have low hemoglobin levels",
  "Are taking certain medication",
  "Were vaccinated recently",
  "Are pregnant or have given birth in last 6 months"
];

const Eligibility = () => {
  const [showcan, setcan] = useState(false);
  const [showcannot, setcannot] = useState(false);

  return (
    <div className='flex flex-col justify-start mx-auto px-4 max-w-5xl my-14 sm:my-28'>
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#406ED5] mb-1 sm:mb-4 text-left">
        Who Can Donate?
      </h1>
      <h2 className='text-gray-400 text-md sm:text-2xl lg:text-3xl mb-3 sm:mb-8 tracking-tight'>
        National Blood Transfusion Council Guidelines
      </h2>
      <p className='text-md sm:text-2xl font-semibold tracking-wide mb-5 sm:mb-8'>
        Before you roll up your sleeve, it's important to know if you meet the basic criteria for donating blood...
      </p>

      {/* Can donate */}
      <div className='text-gray-600 text-md sm:text-xl font-semibold tracking-wide max-w-3xl'>
        <p
          className='cursor-pointer inline-block border-[3px] border-[#8EB1FF] bg-[#E3EBFD8C] rounded-2xl px-8 sm:px-16 py-2 mb-2 sm:mb-4'
          onClick={() => setcan(!showcan)}
        >
          You <span className='text-[#349954] font-bold'>can</span>{" "}donate blood if you
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#349954"
            className={'w-8 h-8 inline'}
            style={{
              transform: showcan ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </p>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showcan ? 'max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className='flex flex-col text-center text-md sm:text-xl text-white font-bold tracking-wider my-3 sm:my-6'>
          {can.map((item, index) => (
            <p key={index} className='sm:mx-44 mb-4 border border-[#349954] rounded-2xl px-6 py-2 bg-[#349954]'>{item}</p>
          ))}
        </div>
      </div>

      {/* Cannot donate */}
      <div className='text-gray-600 text-md sm:text-xl font-semibold tracking-wide max-w-3xl'>
        <p
          className='cursor-pointer inline-block border-[3px] border-[#8EB1FF] bg-[#E3EBFD8C] rounded-2xl px-8 sm:px-16 py-2 mb-2 sm:mb-4'
          onClick={() => setcannot(!showcannot)}
        >
          You should strictly<span className='text-[#F23737] font-bold'> abstain</span>{" "}from donating blood if you
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#F23737"
            className="w-8 h-8 inline"
            style={{
              transform: showcannot ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </p>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showcannot ? 'max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className='flex flex-col text-center text-md sm:text-xl text-white font-bold tracking-wider my-6'>
          {cannot.map((item, index) => (
            <p key={index} className='sm:mx-44 mb-4 border border-[#F23737] rounded-2xl px-6 py-2 bg-[#F23737]'>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
