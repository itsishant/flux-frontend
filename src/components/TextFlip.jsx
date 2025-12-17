import { useState, useEffect } from "react";

export const TextFlip = ({
  words = ["Review", "Analysis", "Insights", "Feedback"],
}) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span
      className={`inline-block transition-all duration-300 transform ${
        isFlipping ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
      }`}
      style={{
        transformOrigin: "center",
        transformStyle: "preserve-3d",
      }}
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300">
        {words[currentWord]}
      </span>
    </span>
  );
};
