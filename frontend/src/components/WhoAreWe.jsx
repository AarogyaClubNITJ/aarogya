import aarogya from '../assets/aarogya.png'
import svg1 from '../assets/svg1.svg'
import { motion } from 'motion/react';

const WhoAreWe = () => {
    const title = "WHO WE ARE";

    const desc = `The Aarogya Club of NIT Jalandhar is a passionate Student-led community dedicated to promoting health and well-being on campus. We strive to create a supportive environment where students can prioritize both their physical and mental health. Through workshops, health camps, fitness programs, and awareness drives, we encourage healthy lifestyles and provide access to valuable heathcare resources.`;
    const seconddesc = "We collaborate with experts to promote holistic health and foster a Culture of wellness, empowering NIT Jalandhar students to lead balanced, healthy lives.";

    return (
        <motion.div
            initial={{ opacity: 0, y: 75 }}
            animate={{ opacity: 1, y: 0 }}


            className=" flex flex-col items-center px-4 py-8 md:py-16">


            <div className="flex flex-col lg:flex-row bg-white w-full max-w-6xl mx-auto my-8 md:my-16 rounded-3xl overflow-hidden sm:shadow-custom ring-1 ring-gray-400">
                <div className='relative'>
                    <img
                        src={svg1}
                        alt="waves svg"
                        className="absolute "
                    />
                </div>
                <div className="w-full lg:w-2/5 h-48 md:h-64 lg:h-auto flex items-center justify-center">
                    <img
                        src={aarogya}
                        alt="Aarogya Club"
                        className="sm:w-2/3 w-1/2 object-contain"
                    />
                </div>
                <div className="flex flex-col justify-center flex-1 p-6 md:p-8 lg:p-12">
                    <div className='relative'>
                        <h2 className="absolute font-bold text-3xl md:text-5xl lg:text-7xl text-[#406ED5] mb-4 md:mb-6">
                            {title}
                        </h2>
                        <h2 id='stroke1' className="mx-[2px] font-bold text-3xl md:text-5xl lg:text-7xl  mb-4 md:mb-6">
                            {title}
                        </h2>
                    </div>

                    <p className="w-full lg:w-11/12 text-sm md:text-base mb-4">
                        {desc}
                    </p>

                    <p className="w-full lg:w-11/12 text-sm md:text-base">
                        {seconddesc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default WhoAreWe;