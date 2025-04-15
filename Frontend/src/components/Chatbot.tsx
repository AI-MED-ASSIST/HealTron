// frontend/src/components/Chatbot.tsx
import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaHistory, FaPlus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";

// Define the message type
interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp?: Date;
}

// Define a type for Chat Sessions (history)
interface ChatSession {
  _id: string;
  userId: string;
  messages: Message[];
  createdAt: string;
}

// Configurable motivational quote and intro text
const motivationalQuote =
  "Your health is your greatest wealth — let’s take care of it today!";
const introText =
  "I am AI-med Assis🤖. I provide assistance and insights exclusively based on your medical profile and history. Feel free to ask your queries";

const Chatbot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  // Greet the user on first activation
  useEffect(() => {
    if (chatVisible && messages.length === 0 && user) {
      const greeting: Message = {
        text: `Hi ${user.username}! 👋\n\n${introText}`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [chatVisible, user, messages.length]);

  // Fetch chat history when history sidebar is toggled on
  useEffect(() => {
    const fetchHistory = async () => {
      if (user && showHistory) {
        try {
          setHistoryLoading(true);
          const res = await fetch(
            `http://localhost:5000/api/chat/history/${user._id}`
          );
          const data = await res.json();
          setChatHistory(data.sessions || []);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        } finally {
          setHistoryLoading(false);
        }
      }
    };
    fetchHistory();
  }, [showHistory, user]);

  // Function to delete a chat session by its ID
  const handleDeleteSession = async (sessionId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/chat/history/${sessionId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setChatHistory(
          chatHistory.filter((session) => session._id !== sessionId)
        );
      } else {
        console.error("Failed to delete session");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  // Build an extended prompt that incorporates user profile details
  const buildExtendedPrompt = (input: string): string => {
    if (!user) return input;
    // Prepare a summary of the user's info in a markdown-friendly format
    const userInfo = `**User Details:**
- **Name:** ${user.username}
- **Age:** ${user.age}
- **Gender:** ${user.gender}
- **Height:** ${user.height} cm
- **Weight:** ${user.weight} kg
- **Medical Conditions:** ${
      user.medicalConditions ? user.medicalConditions.join(", ") : "None"
    }`;

    // Instruct the backend: For medically relevant queries, include suggestions using bullet points.
    return `${userInfo}

As AI-med Assist, please answer the following question if it is related to either medical/health topics **or** if it is requesting details from the user's profile. Otherwise, respond with "I'm sorry, I can only assist with medical-related inquiries." If the query is medically relevant and requires recommendations, please provide your suggestions using bullet points according to the question and make the suggestions crisp and short in most cases, kindly add medical suggesstions for all queries related to user health and medical query, if the user directly asks for suggestions or recommendations give them in detail.

**User Question:** ${input}`;
  };

  // Send user message to backend
  const sendMessage = async (input: string) => {
    if (!input.trim()) return;
    const userMessage: Message = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsSending(true);
    try {
      // Build the extended prompt with user data for context analysis
      const extendedPrompt = buildExtendedPrompt(input);
      // Replace with your actual backend endpoint for chatbot response
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: extendedPrompt, userId: user?._id }),
      });
      const data = await response.json();
      const botMessage: Message = {
        text: data.response || "Error getting response",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${error.message}`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      console.error("Error connecting to backend:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Handle new chat: Save current conversation, then clear messages
  const handleNewChat = async () => {
    if (messages.length > 0 && user) {
      try {
        await fetch("http://localhost:5000/api/chat/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, messages }),
        });
      } catch (error) {
        console.error("Error saving chat session", error);
      }
    }
    setMessages([]);
  };

  const toggleChat = () => setChatVisible(!chatVisible);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button using the provided image */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-2 bg-gray-800 rounded-full shadow-lg"
      >
        <img
          src="/images/Boticon.png"
          alt="Chatbot"
          className="w-10 h-10 object-contain"
        />
      </button>

      {chatVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 right-6 w-96 bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden flex flex-col"
        >
          {/* Header with History and New Chat icons */}
          <div className="flex items-center justify-between bg-gray-800 p-3 border-b border-gray-700">
            <span className="font-bold text-lg">AI-med Assist</span>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowHistory(true)}
                className="hover:text-blue-400"
              >
                <FaHistory />
              </button>
              <button onClick={handleNewChat} className="hover:text-blue-400">
                <FaPlus />
              </button>
            </div>
          </div>
          {/* Chat Area: fixed height with scroll */}
          <div
            className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-800"
            style={{ maxHeight: "450px" }}
          >
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-xl text-sm shadow-md max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-600 self-end"
                    : "bg-gray-700 self-start"
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  <span>{msg.text}</span>
                )}
              </motion.div>
            ))}
          </div>
          {/* Input Area */}
          <div className="flex items-center p-3 border-t border-gray-700 bg-gray-800">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg text-gray-900 focus:outline-none"
              disabled={isSending}
            />
            <button
              onClick={() => sendMessage(userInput)}
              disabled={isSending}
              className="ml-2 bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isSending ? "..." : <FaPaperPlane className="text-white" />}
            </button>
          </div>
        </motion.div>
      )}

      {/* Chat History Sidebar */}
      {showHistory && (
        <div className="fixed top-0 right-0 h-full w-1/3 bg-gray-900 shadow-2xl p-6 z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Chat History</h2>
            <button
              onClick={() => setShowHistory(false)}
              className="text-white hover:text-blue-400"
            >
              X
            </button>
          </div>
          {historyLoading ? (
            <p className="text-blue-400">Loading history...</p>
          ) : chatHistory.length > 0 ? (
            chatHistory.map((session) => (
              <div
                key={session._id}
                className="mb-4 border-b border-gray-700 pb-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-300">
                    {new Date(session.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDeleteSession(session._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                {session.messages.map((msg: Message, idx: number) => (
                  <p
                    key={idx}
                    className={`text-sm ${
                      msg.sender === "user" ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
                    {msg.text}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-300">No chat history available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
