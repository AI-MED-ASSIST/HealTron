import React from "react";
import { motion } from "framer-motion";
import ck from "../../public/Team/ck.jpeg";
import dinesh from "../../public/Team/dinesh.jpg";
import priyanka from "../../public/Team/priyanka.png";
import gk from "../../public/Team/gk.jpg";
import akila from "../../public/Team/akila.jpg";

const teamMembers = [
  {
    name: "Deenathayalan C K",
    role: "AI/Fullstack Developer",
    image: ck,
  },
  {
    name: "Dinesh N T",
    role: "AI/Fullstack Developer",
    image: dinesh,
  },
  {
    name: "Priyanka K",
    role: "AI/ML Developer",
    image: priyanka,
  },
  {
    name: "Gopalakrishnan M",
    role: "Python Developer",
    image: gk,
  },
];

const teamMentor = {
  name: "Mentor Name",
  role: "Team Mentor",
  image: akila,
};

const Team = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const memberVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 0 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -10, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      id="team"
      className="bg-gray-50 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Our Team
        </h2>
        <h3 className="text-lg sm:text-2xl text-gray-700 mb-12">
          Meet the passionate minds driving innovation and care behind
          Personalized AI-Med Assist
        </h3>

        {/* Team Members Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12 justify-items-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-[#2092fa] cursor-pointer hover:shadow-lg transition-shadow max-w-xs w-full"
              variants={memberVariants}
              whileHover="hover"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gray-800">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Mentor Section */}
        <div className="mt-12">
          <h3 className="text-lg sm:text-xl text-gray-800 mb-6">
            Under the Guidance of
          </h3>
          <motion.div
            className="mx-auto bg-white rounded-lg shadow-md p-6 border border-[#2092fa] cursor-pointer hover:shadow-lg transition-shadow max-w-xs w-full"
            variants={memberVariants}
            whileHover="hover"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gray-800">
              <img
                src={teamMentor.image}
                alt={teamMentor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
              {teamMentor.name}
            </h3>
            <p className="text-sm text-gray-500">{teamMentor.role}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Team;
