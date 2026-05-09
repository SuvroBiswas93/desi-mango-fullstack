"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // একটু বোল্ড অ্যারো ব্যবহার করছি

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setIsVisible(scrolled > 300);

      if (maxHeight > 0) {
        setProgress((scrolled / maxHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-10 left-6 md:left-12 z-[9999] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isVisible 
          ? "opacity-100 translate-y-0 rotate-0 scale-100" 
          : "opacity-0 translate-y-16 rotate-12 scale-50 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative p-4 flex items-center justify-center transition-all duration-300 active:scale-90"
        aria-label="Scroll to top"
      >
        {/* Main Button Body with Glass Effect */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 group-hover:shadow-orange-500/20 group-hover:bg-white transition-all duration-500" />

        {/* Outer Progress Ring - Thin & Elegant */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="rgba(249, 115, 22, 0.1)" // Very light orange track
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="#f97316" // Vibrant Orange
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>
        
        {/* Animated Icon */}
        <div className="relative z-10 flex flex-col items-center overflow-hidden h-6 w-6">
          <ArrowUp 
            className="w-6 h-6 text-orange-600 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%]" 
            strokeWidth={2.5}
          />
          <ArrowUp 
            className="w-6 h-6 text-orange-600 absolute top-[150%] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:top-0" 
            strokeWidth={2.5}
          />
        </div>

        {/* Bottom Small Indicator Dot */}
        <div className="absolute bottom-1 w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Decorative Glow Background */}
      <div className="absolute -z-10 inset-4 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default ScrollToTop;