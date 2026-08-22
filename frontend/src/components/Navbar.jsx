
import { useState } from 'react';
import aarogya from '../assets/aarogya.png'
import logo from '../assets/nitjlogo.png'
import Button from './Button'
import { motion } from 'motion/react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
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
            <ul className="sm:flex hidden gap-1 items-center text-base lg:text-lg">
                <li><NavLink to='/' className={({ isActive }) => `rounded-lg px-3 py-2 font-medium transition-colors duration-200 hover:bg-[#E8F1FF] hover:text-[#406ED5] ${isActive ? 'bg-[#E8F1FF] text-[#406ED5]' : 'text-gray-800'}`}>Home</NavLink></li>
                {/* <li className='cursor-pointer hover:text-blue-700'><a href="#goals">Goals</a></li>
                <li className='cursor-pointer hover:text-blue-700'><a href='#events'>Events</a></li> */}
                <li><NavLink to='/team' className={({ isActive }) => `rounded-lg px-3 py-2 font-medium transition-colors duration-200 hover:bg-[#E8F1FF] hover:text-[#406ED5] ${isActive ? 'bg-[#E8F1FF] text-[#406ED5]' : 'text-gray-800'}`}>Teams</NavLink></li>
                <li><NavLink to='/gallery' className={({ isActive }) => `rounded-lg px-3 py-2 font-medium transition-colors duration-200 hover:bg-[#E8F1FF] hover:text-[#406ED5] ${isActive ? 'bg-[#E8F1FF] text-[#406ED5]' : 'text-gray-800'}`}>Gallery</NavLink></li>
                {/* <li className='cursor-pointer hover:text-blue-700'><Link to='/bloodbank'>Blood Bank</Link></li> */}
                <li><NavLink to='/quiz' className={({ isActive }) => `rounded-lg px-3 py-2 font-medium transition-colors duration-200 hover:bg-[#E8F1FF] hover:text-[#406ED5] ${isActive ? 'bg-[#E8F1FF] text-[#406ED5]' : 'text-gray-800'}`}>Quiz</NavLink></li>
                <li><NavLink to='/bloodbank' className={({ isActive }) => `rounded-lg px-3 py-2 font-medium transition-colors duration-200 hover:bg-[#E8F1FF] hover:text-[#406ED5] ${isActive ? 'bg-[#E8F1FF] text-[#406ED5]' : 'text-gray-800'}`}>Blood Bank</NavLink></li>
                {/* <li className='cursor-pointer hover:text-blue-700'>Contact Us</li> */}
            </ul>
            <div className='flex gap-4 items-center'>
                <div className='hidden sm:flex gap-3 items-center'>
                    <a href="https://www.instagram.com/aarogya_nitj/" target="_blank" rel="noreferrer" aria-label="Visit Aarogya on Instagram" title="Instagram">
                        <FaInstagram size="1.7em" className="text-[#E4405F] cursor-pointer hover:opacity-75" />
                    </a>
                    <a href="mailto:aarogyaclub@nitj.ac.in" aria-label="Email Aarogya" title="Email">
                        <IoMailOutline size="1.8em" className="text-[#EA4335] cursor-pointer hover:opacity-75" />
                    </a>
                    <a href="https://chat.whatsapp.com/IkzxkkqbSLPDLmw6SJC0ws?s=cl&p=a&ilr=1" target="_blank" rel="noreferrer" aria-label="Join Aarogya on WhatsApp" title="WhatsApp">
                        <FaWhatsapp size="1.7em" className="text-[#25D366] cursor-pointer hover:opacity-75" />
                    </a>
                </div>
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
