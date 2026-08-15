import React from 'react';
import Button from './Button';
import { motion } from 'motion/react';
import Marquee from "react-fast-marquee";
import aarogyahindi from "../assets/aarogyahindi.png";
import flower from '../assets/flower.svg';
import cover from '../assets/cover.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const firstText = "AAROGYA CLUB";
    const description = "A Step towards Healthier you";

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setMousePosition({
            x: (clientX - window.innerWidth / 2) * 0.04,
            y: (clientY - window.innerHeight / 2) * 0.04
        });
    };

    const AnimationProps = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: {
            delay: 1.7,
            type: "spring",
            stiffness: 120
        }
    };

    return (
        <div
            id='home'
            className="flex flex-col bg-white items-center font-Basic relative pt-36 pb-10 px-4 md:px-6 lg:px-8"
            onMouseMove={handleMouseMove}
        >
            {/* Background cover image */}
            <motion.img
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    x: mousePosition.x,
                    y: mousePosition.y
                }}
                transition={{
                    delay: 2.5,
                    duration: 0.4,
                    x: { duration: 0.1, ease: "easeOut" },
                    y: { duration: 0.1, ease: "easeOut" }
                }}
                src={cover}
                className='absolute w-3/4 -top-[10px] right-36 sm:flex hidden z-40'
                alt="triangles"
            />

            {/* Main content container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col justify-center items-center w-full max-w-6xl mx-auto"
            >
                {/* Title section */}
                <div className="relative w-full text-center">
                    <span className="sr-only">{firstText}</span>
                    <motion.span
                        aria-hidden="true"
                        className="inline-block text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-[#4BC1E2] whitespace-nowrap"
                        initial="initial"
                        animate="animate"
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {firstText.split(" ").map((word, wordIndex) => (
                            <React.Fragment key={wordIndex}>
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        className="inline-block"
                                        key={letterIndex}
                                        variants={AnimationProps}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                                <motion.span
                                    className="inline-block"
                                    key={`space-${wordIndex}`}
                                    variants={AnimationProps}
                                >
                                    &nbsp;
                                </motion.span>
                            </React.Fragment>
                        ))}
                    </motion.span>
                </div>

                {/* Description */}
                <motion.p
                    initial={AnimationProps.initial}
                    animate={AnimationProps.animate}
                    transition={AnimationProps.transition}
                    className="w-full sm:w-2/3 mt-1 font-semibold text-base sm:text-lg md:text-xl text-center px-4"
                >
                    {description}
                </motion.p>

                {/* Decorative images */}
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.5 }}
                    className='absolute w-[100px] sm:w-[150px] right-4 sm:right-56 top-40 sm:top-48 mt-16'
                    src={aarogyahindi}
                    alt="Aarogya Hindi"
                />

                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.5 }}
                    className='absolute w-[50px] sm:w-[75px] right-96 mt-28 mr-6 hidden md:flex'
                    src={flower}
                    alt="Decorative flower"
                />
                {/* Button */}
                <Link to="/quiz">
                    <motion.div
                        className='mt-2 md:mt-3 relative z-40'
                        initial={AnimationProps.initial}
                        animate={AnimationProps.animate}
                        transition={AnimationProps.transition}
                    >

                        <Button buttonColor="#406ED5" textColor="white" buttonText="Quiz-6" />

                    </motion.div>
                </Link>

                <Link to="/bloodbank">
                    <motion.div
                        className='mt-2 md:mt-3 relative z-40'
                        initial={AnimationProps.initial}
                        animate={AnimationProps.animate}
                        transition={{ ...AnimationProps.transition, delay: 2.0 }}
                    >

                        <Button buttonColor="#406ED5" textColor="white" buttonText="Blood Bank" />

                    </motion.div>
                </Link>
            </motion.div>

            {/* Marquee */}
            <Marquee
                autoFill={true}
                className='w-full md:w-[80vw] text-xl sm:text-2xl md:text-3xl font-bold fixed mt-[150px] select-none overflow-hidden'
                gradient={true}
                gradientColor='white'
                pauseOnHover={true}
            >
                <h3 className='mx-6 md:mx-12'>\HEALTH CHECKUP CAMPS</h3>
                <h3 className='mx-6 md:mx-12'>\COMPETITIONS</h3>
                <h3 className='mx-6 md:mx-12'>\MARATHONS</h3>
                <h3 className='mx-6 md:mx-12'>\CYCLOTHONS</h3>
                <h3 className='mx-6 md:mx-12'>\BLOOD DONATION CAMPS</h3>
            </Marquee>
        </div>
    );
};

export default Hero;
