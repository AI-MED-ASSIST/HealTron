import React from "react";
import { motion } from "framer-motion";
import ck from "../../public/Team/ck.jpeg";
import dinesh from "../../public/Team/dinesh.jpg";
import priyanka from "../../public/Team/priyanka.png";
import gk from "../../public/Team/gk.png";

const teamMembers = [
  {
    name: "Deenathayalan C K",
    role: " Developer",
    image: ck,
  },
  {
    name: "Dinesh N T",
    role: " Developer",
    image: dinesh,
  },
  {
    name: "Priyanka K",
    role: " Developer",
    image: priyanka,
  },
  {
    name: "Gopalakrishnan M",
    role: " Developer",
    image: gk,
  },
];

const teamMentor = {
  name: "Mentor Name",
  role: "Team Mentor",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s",
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
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Team</h2>
        <h3 className="text-2xl  text-gray-700 mb-12">
          Meet the passionate minds driving innovation and care behind
          Personalized AI-Med Assist
        </h3>

        {/* Team Members Row */}
        <motion.div className="flex justify-center space-x-6 mb-12 md:space-x-8 lg:space-x-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md shadow-blue-400 p-6 w-48 md:w-56 lg:w-64 border border-[#2092fa] cursor-pointer"
              variants={memberVariants}
              whileHover="hover"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gray-800">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Mentor Section */}
        <div className="mt-12">
          <h3 className="text-xl  text-gray-800 mb-6">Under the Guidance of</h3>
          <motion.div
            className="bg-white rounded-lg shadow-md shadow-blue-400 p-6 w-48 md:w-56 lg:w-64 border border-[#2092fa] mx-auto cursor-pointer"
            variants={memberVariants}
            whileHover="hover"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto mb-4">
              <img
                src={teamMentor.image}
                alt={teamMentor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
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
