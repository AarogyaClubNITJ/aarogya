import { getimageURL } from '../utils/image-utils';
import { motion } from 'motion/react';
import { useState } from 'react';

const teamData = [
  // Student Coordinators
  {
    id: 1,
    name: "Sarthak Maheshwari",
    position: "Student Coordinator",
    profilePic: "Sarthak Maheshwari.png",
  },
  {
    id: 2,
    name: "Aman Gautam",
    position: "Student Coordinator",
    profilePic: "Aman_Gautam.jpg",
  },

  // Outreach Team
  {
    id: 5,
    name: "Abhishek Yadav",
    position: "Mentor",
    profilePic: "abhishek_yadav.JPG",
  },
  {
    id: 13,
    name: "Anuj Yadav",
    position: "Mentor",
    profilePic: "anujyadav.jpg",
  },
  {
    id: 12,
    name: "Ajay Saini",
    position: "Technical Head",
    profilePic: "ajaysaini.png",
  },
  {
    id: 22,
    name: "Dipesh Rewar",
    position: "Technical Head",
    profilePic: "dipesh.jpg",
  },
  {
    id: 11,
    name: "Pradeep Kumar Awasthi",
    position: "Technical Lead",
    profilePic: "pradeepawasthi.jpg",
  },
  {
    id: 10,
    name: "Vrinda ",
    position: "Technical Lead",
    profilePic: "vrinda copy.jpg",
  },
  {
    id: 24,
    name: "Kritika Joshi",
    position: "Technical Executive",
    profilePic: "KritikaJoshi.jpg",
  },
  {
    id: 18,
    name: "Nikhil Yadav",
    position: "Technical Executive",
    profilePic: "nikhil.jpg",
  },
  {
    id: 30,
    name: "Rahul Saini",
    position: "Outreach Head",
    profilePic: "rahulsaini.jpg",
  },
  {
    id: 31,
    name: "Archita ",
    position: "Outreach Head",
    profilePic: "archita.jpeg",
  },

  // Technical Team
  {
    id: 4,
    name: "Pratistha Jadia",
    position: "Outreach Lead",
    profilePic: "pratisthajadia.jpg",
  },
  {
    id: 32,
    name: "Harshita",
    position: "Outreach Head",
    profilePic: "harshita.jpeg",
  },
  {
    id: 33,
    name: "Shivank Shukla",
    position: "Outreach Executive",
    profilePic: "shivank.jpeg",
  },
  {
    id: 9,
    name: "Tanisha",
    position: "Outreach Executive",
    profilePic: "tanisha.jpg",
  },
  {
    id: 26,
    name: "Pankaj Sharma",
    position: "Outreach Executive",
    profilePic: "pankajsharma.png",
  },
  {
    id: 27,
    name: "Ayush Yadav",
    position: "Management Head",
    profilePic: "ayushyadav.jpeg",
  },

  // Content Creation
  {
    id: 21,
    name: "Sourav Sharma",
    position: "Management Head",
    profilePic: "sourav.jpg",
  },
  {
    id: 6,
    name: "Karan Bhagel",
    position: "Management Lead",
    profilePic: "karanbaghel.jpeg",
  },
  {
    id: 7,
    name: "Basant",
    position: "Management Lead",
    profilePic: "basant.jpeg",
  },
  {
    id: 35,
    name: "Unnati",
    position: "Management Executive",
    profilePic: "unnati.jpg",
  },
  {
    id: 20,
    name: "Jigyasa",
    position: "Management Executive",
    profilePic: "JIGYASA.jpg",
  },
  {
    id: 17,
    name: "Muskan ",
    position: "Design Head",
    profilePic: "muskan.jpg",
  },

  // Social Media Team
  {
    id: 19,
    name: "Ayush Soni",
    position: "Design Head",
    profilePic: "ius.jpg",
  },
  {
    id: 36,
    name: "Diya Joshi",
    position: "Design Lead",
    profilePic: "diya.png",
  },
  {
    id: 16,
    name: "Ayush Gupta",
    position: "Design Lead",
    profilePic: "ayushgupta.jpeg",
  },
  {
    id: 15,
    name: "Karan Gupta",
    position: "Design Executive",
    profilePic: "karangupta.jpeg",
  },
  {
    id: 23,
    name: "Aditi Mahajan",
    position: "Social Media Head",
    profilePic: "aditimahajan.jpg",
  },
  {
    id: 8,
    name: "Amrinder Singh",
    position: "Social Media Head",
    profilePic: "amrindersingh.jpeg",
  },
  {
    id: 24,
    name: "Sakshi ",
    position: "Social Media Lead",
    profilePic: "sakshi copy.jpg",
  },
  {
    id: 25,
    name: "Gurmeet Singh",
    position: "Social Media Lead",
    profilePic: "gurmeetsingh.jpg",
  },
  {
    id: 26,
    name: "Aryan Shukla",
    position: "Social Media Executive",
    profilePic: "aryanshukla.JPG",
  },
  {
    id: 27,
    name: "Tanvi",
    position: "Social Media Executive",
    profilePic: "tanvi.jpg",
  },
  {
    id: 28,
    name: "Atharva",
    position: "Social Media Executive",
    profilePic: "atharav.jpg",
  },
  {
    id: 29,
    name: "Anshu Verma",
    position: "Content Head",
    profilePic: "anshumam.jpg",
  },
  {
    id: 30,
    name: "Ashish Gautam",
    position: "Content Head",
    profilePic: "ashish.jpeg",
  },
  {
    id: 31,
    name: "Tanishqa",
    position: "Content Lead",
    profilePic: "tanishqa.jpg"
  },
  {
    id: 32,
    name: "Ansh Kailwal",
    position: "Content Lead",
    profilePic: "ansh.jpeg",
  },
  {
    id: 33,
    name: "Bhavy",
    position: "Content Executive",
    profilePic: "bhavi.jpg",
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
    setSelection("Management");
  }

  function handleSocialMedia() {
    setSelection("Social Media");
  }

  function handleOutreach() {
    setSelection("Outreach");
  }

  function handleTechnical() {
    setSelection("Technical");
  }

  // Filter team members
  const filteredTeam = selection
    ? teamData.filter((member) =>
        member.position.includes(selection)
      )
    : teamData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <div className="min-w-screen sm:mx-20 mx-5 rounded-3xl mt-10 overflow-hidden flex flex-col justify-center items-center font-Basic bg-[#fcfbfc]">

        <p className="mt-10 bg-red-400 px-4 py-1 rounded-3xl">
          We're here!
        </p>

        <h2 className="text-2xl sm:text-6xl font-semibold text-green-900 mt-4 text-center">
          The Minds and Hands
          <span className="block">Shaping Aarogya Club</span>
        </h2>

        <div className="flex gap-7 mt-7 flex-1 flex-wrap justify-center">

          {/* All */}
          <div
            className={`px-4 py-1 rounded-xl cursor-pointer ${
              selection === null
                ? "bg-gray-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={handleAll}
          >
            All
          </div>

          {/* Coordinators */}
          <div
            className={`px-4 py-1 rounded-xl cursor-pointer ${
              selection === "Student Coordinator"
                ? "bg-gray-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={handleCoordinator}
          >
            Coordinators
          </div>

          {/* Management */}
          <div
            className={`px-4 py-1 rounded-xl cursor-pointer ${
              selection === "Management"
                ? "bg-gray-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={handleManagement}
          >
            Management
          </div>

          {/* Social Media */}
          <div
            className={`px-4 py-1 rounded-xl cursor-pointer ${
              selection === "Social Media"
                ? "bg-gray-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={handleSocialMedia}
          >
            Social Media
          </div>

          {/* Outreach */}
          <div
            className={`px-4 py-1 rounded-xl cursor-pointer ${
              selection === "Outreach"
                ? "bg-gray-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={handleOutreach}
          >
            Outreach
          </div>

          {/* Technical */}
          <div
            className={`px-4 py-1 rounded-xl cursor-pointer ${
              selection === "Technical"
                ? "bg-gray-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={handleTechnical}
          >
            Technical
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 w-full sm:w-[75%] my-10 px-4 sm:px-0">

          {filteredTeam.map((team) => (
            <div
              key={team.id}
              className="order-4 sm:order-1 flex flex-col items-center gap-3 justify-center"
            >
              <img
                loading="lazy"
                className="rounded-xl w-full max-w-[250px] h-[230px] object-cover"
                src={getimageURL(team.profilePic)}
                alt={team.name}
              />

              <div className="text-center">
                <h2 className="font-semibold text-nowrap">
                  {team.name}
                </h2>

                <p className="text-gray-600 text-nowrap">
                  {team.position}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
};

export default Team;
