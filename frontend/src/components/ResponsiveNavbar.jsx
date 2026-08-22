import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import aarogya from "../assets/aarogya.png";
import logo from "../assets/nitjlogo.png";

const ResponsiveNavbar = ({ open, setOpen }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  //  menu animation
  const menuVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={handleLinkClick}
          />

          {/* Right-side panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-screen w-3/5 bg-gradient-to-b from-white via-gray-100 to-white z-50 shadow-lg rounded-l-2xl p-8 flex flex-col justify-between"
          >
            <div>
              {/* Logos + Close */}
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-4 items-center">
                  <img src={logo} alt="NIT Jalandhar Logo" className="w-10" />
                  <img src={aarogya} alt="Aarogya Logo" className="w-14" />
                </div>
                <IoMdClose
                  size="2em"
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Menu items */}
              <motion.ul
                className="flex flex-col gap-8 text-2xl font-semibold"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { name: "Home", link: "/" },
                  { name: "Team", link: "/team" },
                  { name: "Gallery", link: "/gallery" },
                  { name: "Quiz", link: "/quiz" },
                  { name: "Blood Bank", link: "/bloodbank" },
                ].map((item) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <Link to={item.link} onClick={handleLinkClick}>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Bottom Join Group */}
            <div className="mt-10">
              <Button
                buttonColor="#40916c"
                textColor="white"
                buttonText="JOIN GROUP"
                redirect="https://chat.whatsapp.com/IkzxkkqbSLPDLmw6SJC0ws?s=cl&p=a&ilr=1"
              />
            </div>
          </motion.div>
        </>
      )}js
    </AnimatePresence>
  );
};

export default ResponsiveNavbar;
