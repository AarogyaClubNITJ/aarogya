import { getimageURL } from '../utils/image-utils';
import { motion } from 'motion/react';
import { useState } from 'react';

const teamData = [
  // Student Coordinators
  {
    id: 1,
    name: "Abhishek Yadav",
    position: "Student Coordinator",
    profilePic: "abhishekyadav-min.jpeg",
  },
  {
    id: 2,
    name: "Anuj",
    position: "Student Coordinator",
    profilePic: "anuj-min.jpg",
  },
  // Outreach Team
  {
    id: 5,
    name: "Ayush Yadav",
    position: "Outreach Team",
    profilePic: "ayushyadav-min.jpeg",
  },
  {
    id: 13,
    name: "Unnati",
    position: "Outreach Team",
    profilePic: "unti.webp",
  },
  {
    id: 12,
    name: "Karan Baghel",
    position: "Outreach Team",
    profilePic: "baghel.webp",
  },
  {
    id: 22,
    name: "Aakanksha Pandit",
    position: "Outreach Team",
    profilePic: "akanshapandit.jpg",
  },
  {
    id: 11,
    name: "Jigyasa",
    position: "Outreach Team",
    profilePic: "JIGYASA.jpg",
  },
  {
    id: 10,
    name: "Aditi Mahajan",
    position: "Outreach Team",
    profilePic: "aditimahajan-min.jpg",
  },
  {
    id: 24,
    name: "Pradeep Awasthi",
    position: "Outreach Team",
    profilePic: "pradeep.jpg",
  },
  {
    id: 18,
    name: "Shivam Singh",
    position: "Outreach Team",
    profilePic: "shivamsingh-min.jpg",
  },
  {
    id: 30,
    name: "Vrinda",
    position: "Outreach Team",
    profilePic: "vrinda.jpg", 
  },
  {
    id: 31,
    name: "Ashish Gautam",
    position: "Outreach Team",
    profilePic: "ashish.jpg", 
  },

  // Technical Team
  {
    id: 4,
    name: "Ayush Soni",
    position: "Technical Team",
    profilePic: "ius.jpg",
  },
  {
    id: 32,
    name: "Sourav Sharma",
    position: "Technical Team",
    profilePic: "souravsharma-min.jpeg",
  },
  {
    id: 33,
    name: "Archita",
    position: "Technical Team",
    profilePic: "architaaggarwal-min.jpg",
  },
  {
    id: 9,
    name: "Ajay Saini",
    position: "Technical Team",
    profilePic: "ajay-min.png",
  },
  {
    id: 26,
    name: "Kritika Joshi",
    position: "Technical Team",
    profilePic: "KritikaJoshi.jpg",
  },
  {
    id: 27,
    name: "Sakshi",
    position: "Technical Team",
    profilePic: "SAKSHI.JPG",
  },

  // Content Creation
  {
    id: 21,
    name: "Mohit",
    position: "Content Creation",
    profilePic: "mohit.webp",
  },
  {
    id: 6,
    name: "Basant Kaswan",
    position: "Content Creation",
    profilePic: "basantkumar-min.jpg",
  },
  {
    id: 7,
    name: "Anshu Verma",
    position: "Content Creation",
    profilePic: "anshu.jpg",
  },
  {
    id: 35,
    name: "Muskan Kaur",
    position: "Content Creation",
    profilePic: "muskan.webp",
  },
  {
    id: 20,
    name: "Gurmeet",
    position: "Content Creation",
    profilePic: "gurmeetsingh-min.jpg",
  },
  {
    id: 17,
    name: "Pratistha Jadia",
    position: "Content Creation",
    profilePic: "pratisthajadia-min.jpg",
  },
  
  // Social Media Team
  {
    id: 19,
    name: "Amrinder Singh",
    position: "Social Media Team",
    profilePic: "amrindersingh-min.jpg",
  },
  {
    id: 36,
    name: "Aman Gautam",
    position: "Social Media Team",
    profilePic: "aman.webp",
  },
  {
    id: 16,
    name: "Diya",
    position: "Social Media Team",
    profilePic: "DIYAJOSH.jpeg",
  },
  {
    id: 8,
    name: "Rahul Saini",
    position: "Social Media Team",
    profilePic: "rahulsaini-min.jpg",
  },
  {
    id: 15,
    name: "Sarthak Maheshwari",
    position: "Social Media Team",
    profilePic: "sarthakmaheshwari-min.png",
  },
  {
    id: 23,
    name: "Ayush Gupta",
    position: "Social Media Team",
    profilePic: "ayushgupta.jpeg",
  },
];

const Team = () => {
  const [selection, setSelection] = useState(null);

  function handleAll() {
    setSelection(null);
  }

  function handleCoordinator() {
    setSelection("Student Coordinator");
  }

  function handleManagement() {
    setSelection("Content Creation");
  }

  function handleSocialMedia() {
    setSelection("Social Media Team");
  }

  function handleOutreach() {
    setSelection("Outreach Team");
  }

  function handleTechnical() {
    setSelection("Technical Team");
  }

  // Filter team members based on selection
  const filteredTeam = selection 
    ? teamData.filter(member => member.position.includes(selection))
    : teamData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <div className="min-w-screen sm:mx-20 mx-5 rounded-3xl mt-10 overflow-hidden flex flex-col justify-center items-center font-Basic bg-[#fcfbfc]">
        <p className='mt-10 bg-red-400 px-4 py-1 rounded-3xl'>We're here!</p>
        <h2 className='text-2xl sm:text-6xl font-semibold text-green-900 mt-4 text-center'>
          The Minds and Hands <span className="block">Shaping Aarogya Club</span>
        </h2>
        <div className='flex gap-7 mt-7 flex-1 flex-wrap justify-center'>
          <div 
            className={`px-4 py-1 rounded-xl cursor-pointer ${selection === null ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'}`} 
            onClick={handleAll}
          >
            All
          </div>
          <div 
            className={`px-4 py-1 rounded-xl cursor-pointer ${selection === "Student Coordinator" ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'}`} 
            onClick={handleCoordinator}
          >
            Coordinators
          </div>
          <div 
            className={`px-4 py-1 rounded-xl cursor-pointer ${selection === "Content Creation" ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'}`} 
            onClick={handleManagement}
          >
            Content Creation
          </div>
          <div 
            className={`px-4 py-1 rounded-xl cursor-pointer ${selection === "Social Media Team" ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'}`} 
            onClick={handleSocialMedia}
          >
            Social Media
          </div>
          <div 
            className={`px-4 py-1 rounded-xl cursor-pointer ${selection === "Outreach Team" ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'}`} 
            onClick={handleOutreach}
          >
            Outreach
          </div>
          <div 
            className={`px-4 py-1 rounded-xl cursor-pointer ${selection === "Technical Team" ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'}`} 
            onClick={handleTechnical}
          >
            Technical
          </div>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 w-full sm:w-[75%] my-10 px-4 sm:px-0'>
          {filteredTeam.map((team) => (
            <div key={team.id} className='order-4 sm:order-1 flex flex-col items-center gap-3 justify-center'>
              <img loading='lazy'
                className='rounded-xl w-full max-w-[250px] h-[230px] object-cover'
                src={getimageURL(team.profilePic)}
                alt={team.name}
              />
              <div className='text-center'>
                <h2 className='font-semibold text-nowrap'>{team.name}</h2>
                <p className='text-gray-600 text-nowrap'>{team.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Team;
