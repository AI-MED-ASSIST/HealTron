import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PlayCircle, XCircle } from "lucide-react";
import intro from "../assets/Healtron intro.mp4";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/RoadMap/Healtron demo.MOV");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVideoSrc(intro);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setHasPlayed(false);
    setError(null);
  };

  useEffect(() => {
    if (isModalOpen && videoRef.current && !hasPlayed) {
      videoRef.current
        .play()
        .then(() => {
          setHasPlayed(true);
        })
        .catch((error) => {
          console.error("Playback failed:", error);
          setHasPlayed(false);
          setError(
            "Failed to play video. Please check the source and try again."
          );
        });
    }
  }, [isModalOpen, hasPlayed]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.disablePictureInPicture = true;
    }
  }, []);

  return (
    <div className="bg-gray-50">
      <div id="about" ref={ref} className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-lg sm:text-2xl md:text-5xl font-bold text-gray-800 mb-4">
            About Personalized AI Med Assist
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl md:text-1xl max-w-3xl mx-auto">
            Revolutionizing Healthcare with the Power of Healtron
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.7,
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="relative">
            <motion.button
              onClick={openModal}
              className="relative cursor-pointer"
              transition={{ duration: 0.2 }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-[85vw] max-w-[590px] rounded-2xl border-2 border-[#2092fa] shadow-xl object-fill"
                style={{ aspectRatio: "20/11", height: "auto" }}
                onLoadedData={() => setIsVideoLoaded(true)}
                disablePictureInPicture
                onError={() => {
                  setError(
                    "Failed to load video. Please check your network connection and the video source."
                  );
                }}
                muted
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center shadow-lg transition-all">
                  <PlayCircle className="w-16 h-16 text-[#2092fa]" />
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative w-full max-w-4xl mx-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={closeModal}
                  className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-gray-300 transition-colors duration-200"
                  aria-label="Close video modal"
                >
                  <XCircle className="w-8 h-8" />
                </button>

                <div className="relative pt-[56.25%] rounded-xl overflow-hidden border-2 border-[#2092fa]">
                  <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full bg-black object-fill"
                    controls
                    autoPlay
                    onLoadedData={() => setIsVideoLoaded(true)}
                    disablePictureInPicture
                    onError={() => {
                      setError(
                        "Failed to load video. Please check your network connection and the video source."
                      );
                    }}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {error && (
                  <div className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-md">
                    {error}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default About;
