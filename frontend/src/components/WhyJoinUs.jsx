import Card from "./Card"
import { motion } from 'motion/react'
import logo1 from '../assets/lightblue.svg'
import logo2 from '../assets/yellowbg.svg'
import logo3 from '../assets/darkblue.svg'

const WhyJoinUs = () => {
     const details = [
        {
            id: 1,
            heading: "Develop Leadership and Teamwork Skills",
            description: "Take on active roles in organizing health initiatives and collaborating with faculty, students, and external organizations. Gain valuable leadership, event management, and teamwork experience that will enrich your college life and boost your resume.",
            bgImage: logo2
        },

        {
            id: 2,
            heading: "Prioritize Your Health and Well-Being",
            description: "Gain access to workshops, fitness programs, and health camps designed to improve both physical and mental health. We provide the resources and support you need to maintain a balanced and healthy lifestyle.",
            bgImage: logo3
        },
        {
            id: 3,
            heading: "Create a Healthier Campus Community",
            description: "Be a driving force in promoting a culture of wellness on campus. Your contributions will directly impact the health and happiness of fellow students, creating a positive and supportive atmosphere that benefits everyone.",
            bgImage: logo1
        }
    ];

    return (
        <div
            className="flex flex-col items-center gap-y-10 mx-12 mt-12">
            <h2 className="text-6xl font-semibold text-[#406ED5] text-nowrap">WHY JOIN US ....</h2>
            <motion.div 
             initial={{
                opacity: 0,
                y: 10
            }}
            whileInView={{
                y: 0,
                opacity: 1,
                transition: {
                    duration: 1
                }
            }}
            viewport={{
                // once: true,
                amount: "some"
            }}
            className="flex sm:flex-row flex-col sm:gap-10 gap-5 sm:overflow-visible overflow-hidden">
                {details.map((detail) => (
                    <Card key={detail.id} heading={detail.heading} description={detail.description} bgImage={detail.bgImage}/>
                ))}
            </motion.div>
        </div>

    )
}

export default WhyJoinUs