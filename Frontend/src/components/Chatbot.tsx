// frontend/Chatbot.tsx

import React, { useState, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  // Replace this with the actual logged-in user's ID (e.g., from context or props)
  const loggedInUserId = "YOUR_USER_ID_HERE";

  // Toggle chat window visibility
  const toggleChat = () => setIsOpen(!isOpen);

  // Fetch personalized greeting when chat opens
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chat/greet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Server error");
        }
        const greetingMessage: Message = {
          text: data.response,
          sender: "bot",
        };
        // Add the greeting message as the first message
        setMessages((prev) => [greetingMessage, ...prev]);
      } catch (error: any) {
        console.error("Error fetching greeting:", error);
      }
    };

    // Only fetch greeting if the chat is open and a user is logged in.
    if (isOpen && loggedInUserId) {
      fetchGreeting();
    }
  }, [isOpen, loggedInUserId]);

  // Send user message to backend and update chat with bot response
  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsSending(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }

      const botMessage: Message = {
        text: data.response || "Error getting response",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Error connecting to backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: Unable to connect to server. ${error.message}`,
          sender: "bot",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendClick = () => {
    sendMessage(userInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(userInput);
    }
  };

  return (
    <div>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 w-16 h-16 bg-gray-900 flex items-center justify-center rounded-full shadow-lg cursor-pointer z-[100]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={toggleChat}
      >
        <img
          src="/images/Boticon.png"
          alt="Chatbot"
          className="w-15 h-15 object-fill"
        />
      </motion.div>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed bottom-20 right-6 w-80 bg-black backdrop-blur-md shadow-xl border border-gray-300 rounded-xl flex flex-col overflow-hidden z-[1000]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot size={22} className="animate-pulse" />
              <span className="font-bold text-lg">AI Assistant</span>
            </div>
            <button
              onClick={toggleChat}
              className="text-white text-lg hover:scale-110 transition-transform duration-200"
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto max-h-80 p-3 space-y-3 bg-gradient-to-b from-gray-100 to-white">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-3 rounded-xl text-sm shadow-md max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center p-3 border-t border-gray-200 bg-white">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              disabled={isSending}
            />
            <button
              onClick={handleSendClick}
              className={`ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 ${
                isSending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSending}
            >
              {isSending ? (
                <FaRobot className="animate-spin text-white" size={18} />
              ) : (
                <FaPaperPlane size={18} />
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;

// // frontend/Chatbot.tsx

// import React, { useState } from "react";
// import { FaRobot, FaPaperPlane } from "react-icons/fa";
// import { motion } from "framer-motion";

// interface Message {
//   text: string;
//   sender: "user" | "bot";
// }

// const Chatbot: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [userInput, setUserInput] = useState<string>("");
//   const [isSending, setIsSending] = useState<boolean>(false);

//   // Toggle chat window visibility
//   const toggleChat = () => setIsOpen(!isOpen);

//   // Send user message to backend and update chat with bot response
//   const sendMessage = async (input: string) => {
//     if (!input.trim()) return;

//     const userMessage: Message = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setUserInput("");
//     setIsSending(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || "Server error");
//       }

//       const botMessage: Message = {
//         text: data.response || "Error getting response",
//         sender: "bot",
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error: any) {
//       console.error("Error connecting to backend:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: `Error: Unable to connect to server. ${error.message}`,
//           sender: "bot",
//         },
//       ]);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserInput(e.target.value);
//   };

//   const handleSendClick = () => {
//     sendMessage(userInput);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage(userInput);
//     }
//   };

//   return (
//     <div>
//       {/* Chat Toggle Button */}
//       <motion.div
//         className="fixed bottom-6 right-6 w-16 h-16 bg-gray-900 flex items-center justify-center rounded-full shadow-lg cursor-pointer z-[100]"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         animate={{ scale: [1, 1.1, 1] }}
//         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//         onClick={toggleChat}
//       >
//         {/* <FaRobot className="text-white" size={24} /> */}
//         <img
//           src="/images/Boticon.png"
//           alt="Chatbot"
//           className="w-15 h-15 object-fill"
//         />
//       </motion.div>

//       {/* Chat Window */}
//       {isOpen && (
//         <motion.div
//           initial={{ x: 300, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: 300, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 100, damping: 15 }}
//           className="fixed bottom-20 right-6 w-80 bg-black backdrop-blur-md shadow-xl border border-gray-300 rounded-xl flex flex-col overflow-hidden z-[1000]"
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-3 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <FaRobot size={22} className="animate-pulse" />
//               <span className="font-bold text-lg">AI Assistant</span>
//             </div>
//             <button
//               onClick={toggleChat}
//               className="text-white text-lg hover:scale-110 transition-transform duration-200"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto max-h-80 p-3 space-y-3 bg-gradient-to-b from-gray-100 to-white">
//             {messages.map((msg, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className={`p-3 rounded-xl text-sm shadow-md max-w-[75%] ${
//                   msg.sender === "user"
//                     ? "bg-blue-500 text-white ml-auto"
//                     : "bg-gray-300 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//               </motion.div>
//             ))}
//           </div>

//           {/* Input Area */}
//           <div className="flex items-center p-3 border-t border-gray-200 bg-white">
//             <input
//               type="text"
//               value={userInput}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Type your message..."
//               className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-200"
//               disabled={isSending}
//             />
//             <button
//               onClick={handleSendClick}
//               className={`ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 ${
//                 isSending ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={isSending}
//             >
//               {isSending ? (
//                 <FaRobot className="animate-spin text-white" size={18} />
//               ) : (
//                 <FaPaperPlane size={18} />
//               )}
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

// old(dinesh front end code)

// import React, { useState } from "react";
// import { FaRobot, FaPaperPlane } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
//   const [userInput, setUserInput] = useState("");

//   // Toggle chatbot visibility
//   const toggleChat = () => setIsOpen(!isOpen);

//   // Handle message sending
//   const sendMessage = async (input: string) => {
//     if (!input.trim()) return;

//     // Append the user's message to the chat
//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setUserInput("");

//     try {
//       // Send the plain text user input to the backend
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await response.json();
//       const botMessage = {
//         text: data.response || "Error getting response",
//         sender: "bot",
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { text: "Error: Unable to connect", sender: "bot" },
//       ]);
//       console.error("Error connecting to backend:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Chat Toggle Button */}
//       <motion.div
//         className="fixed bottom-6 right-6 w-16 h-16 bg-gray-900 flex items-center justify-center rounded-full shadow-lg cursor-pointer z-[100]"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         animate={{ scale: [1, 1.1, 1] }}
//         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//         onClick={toggleChat}
//       >
//         <img
//           src="/images/Boticon.png"
//           alt="Chatbot"
//           className="w-15 h-15 object-fill"
//         />
//       </motion.div>

//       {/* Chatbox UI */}
//       {isOpen && (
//         <motion.div
//           initial={{ x: 300, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: 300, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 100, damping: 15 }}
//           className="fixed bottom-20 right-6 w-80 bg-white/60 backdrop-blur-lg shadow-xl border border-gray-300 rounded-xl flex flex-col overflow-hidden z-[1000]"
//         >
//           {/* Chat Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-3 flex justify-between items-center shadow-md">
//             <div className="flex items-center gap-2">
//               <FaRobot size={22} className="animate-pulse" />
//               <span className="font-bold text-lg">AI Assistant</span>
//             </div>
//             <button
//               onClick={toggleChat}
//               className="text-lg hover:scale-110 transition-transform duration-200"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto max-h-80 p-3 space-y-3 bg-gradient-to-b from-gray-100 to-white">
//             {messages.map((msg, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className={`p-3 rounded-xl text-sm shadow-md ${
//                   msg.sender === "user"
//                     ? "bg-blue-500 text-white ml-auto"
//                     : "bg-gray-300 text-gray-800"
//                 } max-w-[75%]`}
//               >
//                 {msg.text}
//               </motion.div>
//             ))}
//           </div>

//           {/* Chat Input Box */}
//           <div className="flex items-center p-3 bg-white border-t border-gray-200">
//             <input
//               type="text"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
//             />
//             <button
//               onClick={() => sendMessage(userInput)}
//               className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-200"
//             >
//               <FaPaperPlane size={18} />
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
