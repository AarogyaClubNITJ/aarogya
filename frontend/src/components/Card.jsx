import { motion } from 'motion/react'

function Card({ heading, description, bgImage }) {
    return (
        <motion.div
            whileHover={{
                scale: 1.1,
                transition: {
                    duration: 0.2
                }
            }}
            style={{backgroundImage: `url(${bgImage})`, backgroundSize:"100%"}}
            className={`flex flex-col px-7 py-8 rounded-2xl mb-10 w-[100%] text-white`}>
            <h1 className="text-3xl font-semibold">{heading}</h1>
            <p className="mt-4 text-xl">{description}</p>

        </motion.div>
    );
}

export default Card;
