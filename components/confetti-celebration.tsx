"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export function ConfettiCelebration({ trigger }: { trigger: boolean }) {
  const [isExploding, setIsExploding] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (trigger) {
      setIsExploding(true);
      const timer = setTimeout(() => {
        setIsExploding(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!isExploding) return null;

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.3}
      colors={["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"]}
    />
  );
}
