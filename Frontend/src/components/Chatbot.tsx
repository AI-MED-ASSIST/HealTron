import React, { useState, useEffect, useRef, useCallback } from "react";
import { MdPlayArrow } from "react-icons/md";
import { RiChatNewLine } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { motion, useAnimation } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";
import botlogo from "../../public/Boticon.png";
interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp?: Date;
}

interface ChatSession {
  _id: string;
  userId: string;
  messages: Message[];
  createdAt: string;
}

const Chatbot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [selectedHistorySession, setSelectedHistorySession] =
    useState<ChatSession | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const controls = useAnimation();
  const interactionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  useEffect(() => {
    if (
      chatVisible &&
      !showHistory &&
      !selectedHistorySession &&
      chatContainerRef.current
    ) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, chatVisible, showHistory, selectedHistorySession]);

  useEffect(() => {
    if (
      chatVisible &&
      messages.length === 0 &&
      user &&
      !showHistory &&
      !selectedHistorySession
    ) {
      setMessages([
        {
          text: `Hi ${user.username}! 👋\n\nI am Healtront🤖, ypur personalized AI-Med Assist. I provide assistance and insights exclusively based on your medical profile and history. Feel free to ask your queries`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [chatVisible, user, messages.length, showHistory, selectedHistorySession]);

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

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/chat/history/${sessionId}`,
        { method: "DELETE" }
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

  const buildExtendedPrompt = (input: string): string => {
    if (!user) return input;
    const userInfo = `**User Details:**\n- **Name:** ${
      user.username
    }\n- **Age:** ${user.age}\n- **Gender:** ${user.gender}\n- **Height:** ${
      user.height
    } cm\n- **Weight:** ${user.weight} kg\n- **Medical Conditions:** ${
      user.medicalConditions ? user.medicalConditions.join(", ") : "None"
    }`;
    return `${userInfo}\n\nAs AI-med Assist, please answer the following question if it is related to either medical/health topics **or** if it is requesting details from the user's profile. Otherwise, respond with "I'm sorry, I can only assist with medical-related inquiries." If the query is medically relevant and requires recommendations, please provide your suggestions using bullet points according to the question and make the suggestions crisp and short in most cases, kindly add medical suggesstions for all queries related to user health and medical query, if the user directly asks for suggestions or recommendations give them in detail.\n\n**User Question:** ${input}`;
  };

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
      const extendedPrompt = buildExtendedPrompt(input);
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

  const handleNewChat = () => {
    if (messages.length > 0 && user) {
      fetch("http://localhost:5000/api/chat/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, messages }),
      }).catch((error) => console.error("Error saving chat session", error));
    }
    setMessages([]);
    setSelectedHistorySession(null);
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
    document.body.style.overflow = !chatVisible ? "hidden" : "";
    setShowHistory(false);
    setSelectedHistorySession(null);
  };

  const closeChat = () => {
    setChatVisible(false);
    document.body.style.overflow = "";
    setShowHistory(false);
    setSelectedHistorySession(null);
  };

  const loadHistorySession = (session: ChatSession) => {
    setMessages(session.messages);
    setSelectedHistorySession(session);
    setShowHistory(false);
  };

  const goBackToChat = () => {
    setSelectedHistorySession(null);
  };

  const handleInteractionClick = () => {
    setShowToggleButton(true);
    controls.start({ scale: 1.3, opacity: 0 }); // Increased scale for bigger effect
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <style jsx>{`
        .interaction-circle {
          width: 70px; /* Increased size */
          height: 70px; /* Increased size */
          border-radius: 50%;
          background-image: radial-gradient(circle, #93c5fd, #60a5fa);
          position: absolute;
          bottom: 6px;
          right: 6px;
          z-index: 49;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .blowing-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(96, 165, 250, 0.4);
          animation: blow 1.5s infinite ease-in-out;
        }
        @keyframes blow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        @media (max-width: 768px) {
          .chatbot-modal {
            width: 95% !important;
            height: 80% !important;
          }
          .chatbot-header {
            padding: 0.75rem !important;
          }
          .chatbot-title {
            font-size: 1.25rem !important;
          }
          .chatbot-messages {
            padding: 0.5rem !important;
          }
          .message-content {
            max-width: 85% !important;
            padding: 0.5rem 0.75rem !important;
            font-size: 0.875rem !important;
          }
          .chatbot-input-container {
            padding: 0.5rem !important;
          }
          .chatbot-input {
            padding: 0.5rem !important;
            font-size: 0.875rem !important;
          }
          .chatbot-send-button {
            width: 2.5rem !important;
            height: 2.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .chatbot-modal {
            height: 90% !important;
          }
          .message-content {
            max-width: 90% !important;
          }
        }
      `}</style>

      {!showToggleButton && (
        <div
          ref={interactionRef}
          className="interaction-circle"
          onClick={handleInteractionClick}
        >
          <motion.div
            className="blowing-circle"
            animate={controls}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {showToggleButton && (
        <motion.button
          onClick={toggleChat}
          className="p-3 bg-blue-500 rounded-full shadow-lg focus:outline-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} // Increased button size
        >
          <img
            src={botlogo}
            alt="Chatbot"
            className="w-16 h-16 object-contain"
          />
        </motion.button>
      )}

      {chatVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[51]">
          <motion.div
            ref={backdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-[50]"
            onClick={closeChat}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-[900px] max-w-4xl h-[550px] bg-white text-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col z-[52] chatbot-modal"
            style={{ pointerEvents: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-gray-50 p-4 border-b border-gray-300 chatbot-header">
              <span className="font-bold text-2xl chatbot-title">Healtron</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowHistory(!showHistory);
                    setSelectedHistorySession(null);
                  }}
                  className="hover:bg-gray-200 rounded p-1 transition-colors duration-200"
                >
                  <MdHistory size={24} className="text-gray-600" />
                </button>
                <button
                  onClick={handleNewChat}
                  className="hover:bg-gray-200 rounded p-1 transition-colors duration-200"
                >
                  <RiChatNewLine size={24} className="text-gray-600" />
                </button>
                <button
                  onClick={closeChat}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded p-1 transition-colors duration-200"
                >
                  <MdClose size={24} />
                </button>
              </div>
            </div>

            <div className="flex h-full overflow-hidden">
              <div
                className="flex-1 overflow-y-auto p-3 chatbot-messages"
                ref={chatContainerRef}
              >
                {showHistory ? (
                  <div>
                    <h3 className="font-bold mb-2 flex justify-between items-center">
                      Chat History
                      <button
                        onClick={() => setShowHistory(false)}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                      >
                        Close
                      </button>
                    </h3>
                    {historyLoading ? (
                      <p className="text-blue-400">Loading...</p>
                    ) : chatHistory.length > 0 ? (
                      chatHistory.map((session) => (
                        <div
                          key={session._id}
                          className="mb-3 border-b border-gray-300 pb-2 last:border-b-0 cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center justify-between"
                          onClick={() => loadHistorySession(session)}
                        >
                          <div>
                            <p className="text-sm text-gray-700">
                              {new Date(session.createdAt).toLocaleString()}
                            </p>
                            {session.messages
                              .slice(-1)
                              .map((msg: Message, idx: number) => (
                                <p
                                  key={idx}
                                  className="text-xs text-gray-600 italic"
                                >
                                  {msg.sender === "user" ? "You: " : "Bot: "}
                                  {msg.text.substring(0, 30)}...
                                </p>
                              ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSession(session._id);
                            }}
                            className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700 flex items-center space-x-1"
                          >
                            <MdClose size={16} /> <span>Delete</span>
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No history available.</p>
                    )}
                  </div>
                ) : selectedHistorySession ? (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold">Previous Chat</h3>
                      <button
                        onClick={goBackToChat}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Back to Chat
                      </button>
                    </div>
                    {selectedHistorySession.messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-2 flex ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <motion.div
                          className={`p-3 px-6 rounded-2xl shadow-md text-sm break-words message-content ${
                            msg.sender === "user"
                              ? "bg-[#2092fa] text-white rounded-br-none"
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                          style={{
                            maxWidth: "75%",
                            display: "inline-block",
                            wordBreak: "break-word",
                          }}
                        >
                          {msg.sender === "bot" ? (
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          ) : (
                            <span>{msg.text}</span>
                          )}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <motion.div
                        className={`p-3 px-6 rounded-2xl shadow-md text-sm break-words message-content ${
                          msg.sender === "user"
                            ? "bg-[#2092fa] text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                        style={{
                          maxWidth: "75%",
                          display: "inline-block",
                          wordBreak: "break-word",
                        }}
                      >
                        {msg.sender === "bot" ? (
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        ) : (
                          <span>{msg.text}</span>
                        )}
                      </motion.div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="flex items-center p-3 border-t border-gray-200 bg-white chatbot-input-container">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(userInput)}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-2xl text-gray-900 focus:outline-none border-2 border-[#2092fa] chatbot-input"
                disabled={isSending || showHistory || selectedHistorySession}
              />
              <button
                onClick={() => sendMessage(userInput)}
                disabled={isSending || showHistory || selectedHistorySession}
                className="ml-2 bg-[#2092fa] p-1 h-11 w-11 rounded-3xl hover:bg-[#187ade] transition-colors flex items-center justify-center chatbot-send-button"
              >
                {isSending ? (
                  "..."
                ) : (
                  <MdPlayArrow className="text-white" size={30} />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
