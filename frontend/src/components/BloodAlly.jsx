import React, { useState } from 'react'
import Ally from '../assets/Ally_image.svg'
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import GiftSVG from '../assets/giftbox.svg';
import BloodAllyForm from './BloodAllyForm';

const BloodAlly = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative bg-[#e7eeff] overflow-hidden py-10 sm:py-20 px-6 sm:px-12 rounded-b-md my-14 sm:mb-28">
      {/* Decorative faint image on right */}
      <div className="pointer-events-none absolute bottom-0 right-0 flex items-center">
        <img
          src={Ally}
          alt=""
          aria-hidden="true"
          className="opacity-100 object-contain h-[85%]"
          style={{ maxWidth: '600px' }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto sm:tracking-wide" >
        <h2 className="text-lg sm:text-5xl font-bold text-[#406ED5] mb-4">
          Become an Aarogya Blood Ally
        </h2>
        <p className="mb-3 sm:mb-8 text-md sm:text-2xl font-medium leading-relaxed">
          Join our trusted network of student donors and help save lives in times of emergency.
        </p>



        {/* Eligibility Criteria */}
        <div className="sm:mb-8 mb-4">
          <div className="flex items-center mb-3 gap-2">
            <div className="text-2xl"><CheckCircleIcon className="sm:h-10 sm:w-10 h-6 w-6 text-green-500 stroke-[2.5]" /></div>
            <h3 className="font-bold text-md sm:text-2xl">Eligibility Criteria</h3>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-md sm:text-xl font-[500] sm:font-semibold leading-relaxed">
            <li>Be willing to donate blood when someone from the community is in urgent need</li>
            <li>Register With Aarogya using our donor form (includes name, blood group, contact info, and availability)</li>
            <li>Consent to be contacted when a matching blood request comes in</li>
            <li>Be responsive - even if unavailable, you must confirm promptly</li>
            <li>
              Provide proof of past donation (if any) to be listed as a verified donor{' '}
              <span className="text-gray-500 font-normal">(Optional)</span>
            </li>
          </ol>
        </div>

        {/* What You Get */}
        <div className="sm:mb-8 mb-6">
          <div className="flex items-center mb-3 gap-2">
            <img
              src={GiftSVG}
              alt="Gift"
              className="h-5 w-5 sm:h-10 sm:w-10 text-green-500"
            />
            <h3 className="font-bold text-md sm:text-2xl">What You Get as a Blood Ally</h3>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-base sm:text-xl font-[500] sm:font-semibold leading-relaxed">
            <li>Stand a chance to receive exclusive T-shirts and goodies from the Aarogya Club</li>
            <li>Recognition Certificates as official appreciation from the Aarogya club for your contribution</li>
            <li>Get a shoutout on our Donor Wall (website, posters, or social handles)</li>
          </ol>
        </div>


        {/* CTA */}
        <div className="mt-3 flex justify-center sm:justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#406ED5] hover:bg-[#335ac1] text-white sm:shadow-custom ring-1 sm:ring-black-400 border border-black px-10 py-2 rounded-xl sm:rounded-lg text-md sm:text-2xl font-bold transition transform active:scale-95"
          >
            Join as a Blood Ally
          </button>
        </div>
      </div>
      {/*Popup Form */}
      <BloodAllyForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};


export default BloodAlly