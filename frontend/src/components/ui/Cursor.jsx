import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

const Cursor = () => {

    const mouse={
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const smoothMouse={
        x: useSpring(mouse.x,{ stiffness: 150, damping: 20 }),
        y: useSpring(mouse.y,{ stiffness: 150, damping: 20 })
    }

    const manageMouseMove= (e) => {
        const { clientX,clientY } =e
        mouse.x.set(clientX)
        mouse.y.set(clientY)
    }

    useEffect(() => {
        window.addEventListener("mousemove",manageMouseMove)
        return () => {window.addEventListener("mousemove",manageMouseMove)}
    })

  return (
    <motion.div 
    style={{left: smoothMouse.x, top: smoothMouse.y}}
    className={`w-[50px] h-[50px] rounded-full bg-black fixed z-20 text-white text-center pt-3`}>HELO</motion.div>
  )
}

export default Cursor