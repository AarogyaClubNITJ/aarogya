
import { useState } from 'react';
import aarogya from '../assets/aarogya.png'
import logo from '../assets/nitjlogo.png'
import Button from './Button'
import { motion } from 'motion/react'
import { GiHamburgerMenu } from "react-icons/gi";
import ResponsiveNavbar from './ResponsiveNavbar';
import {Link, NavLink} from 'react-router-dom'


const Navbar = () => {
    const [open, setopen] = useState(false)


    return (
        <>
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-around mt-1 bg-white font-Basic items-center">
            <div className="flex gap-5 items-center">
                <img src={logo} alt="nit jalandhar logo" className='w-12' />
                <img src={aarogya} alt="aarogya logo" className='w-16' />
            </div>
            <ul className="sm:flex hidden gap-5 items-center text-xl">
                <li className='cursor-pointer hover:text-blue-700'><Link to='/'>Home</Link></li>
                {/* <li className='cursor-pointer hover:text-blue-700'><a href="#goals">Goals</a></li>
                <li className='cursor-pointer hover:text-blue-700'><a href='#events'>Events</a></li> */}
                <li className='cursor-pointer hover:text-blue-700'><Link to='/team'>Teams</Link></li>
                <li className='cursor-pointer hover:text-blue-700'><Link to='/gallery'>Gallery</Link></li>
                {/* <li className='cursor-pointer hover:text-blue-700'><Link to='/bloodbank'>Blood Bank</Link></li> */}
                <li className='cursor-pointer hover:text-blue-700'><Link to='/quiz'>Quiz</Link></li>
                <li className='cursor-pointer hover:text-blue-700'><Link to='/bloodbank'>Blood Bank</Link></li>
                {/* <li className='cursor-pointer hover:text-blue-700'>Contact Us</li> */}
            </ul>
            <div className='flex gap-4 items-center'>
                <Button buttonColor="#40916c" textColor="white" buttonText="JOIN US" redirect="https://linktr.ee/aarogya_nitj" />
                 <div className='sm:hidden block'>
                    <GiHamburgerMenu 
                        onClick={() => setopen(!open)} 
                        size="2em" 
                        className="cursor-pointer" 
                    />
                </div> 
            </div>
        </motion.div>
        <ResponsiveNavbar open={open} setOpen={setopen}/>
        </>
    )
}

export default Navbar
