"use client";

import { useEffect, useState } from "react";

const notifications = [
  { name: "তানভীর", amount: "৫ কেজি", product: "আম", time: "৩ মিনিট আগে" },
  { name: "নাঈম", amount: "৭ কেজি", product: "আম", time: "২ মিনিট আগে" },
  { name: "হাসান", amount: "১২ কেজি", product: "আম", time: "৪ মিনিট আগে" },
  { name: "রিয়াদ", amount: "৪ কেজি", product: "আম", time: "১ মিনিট আগে" },
  { name: "জুবায়ের", amount: "৮ কেজি", product: "আম", time: "৫ মিনিট আগে" },
  { name: "মাহিম", amount: "৫ কেজি", product: "আম", time: "২ মিনিট আগে" },
  { name: "ইমরান", amount: "৯ কেজি", product: "আম", time: "৩ মিনিট আগে" },
  { name: "আরিফ", amount: "১১ কেজি", product: "আম", time: "১ মিনিট আগে" },
  { name: "শাওন", amount: "২ কেজি", product: "আম", time: "৪ মিনিট আগে" },
  { name: "ফাহিম", amount: "৬ কেজি", product: "আম", time: "২ মিনিট আগে" },
];

export default function LivePurchasePopup() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 1000);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[current];

  return (
<div className="fixed left-36 bottom-28 -translate-x-1/2 sm:left-6 sm:bottom-28 sm:translate-x-0 z-50">
      <div
        className={`
          bg-white rounded-xl shadow-xl 
          border-l-4 border-orange-600
          border border-gray-100
          px-4 py-3
          min-w-[280px] max-w-[320px]
          transition-all duration-500 ease-in-out
          hover:shadow-2xl hover:scale-105
          cursor-pointer
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
        `}
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-900">{notification.name}</span>
          <span className="mx-1.5 text-gray-400">•</span>
          <span className="font-medium text-gray-700">{notification.amount}</span>
          <span className="mx-1.5 text-gray-400">•</span>
          <span className="font-medium text-gray-700">{notification.product}</span>
          <span className="ml-1.5 text-gray-600">কিনেছেন</span>
        </p>
        <p className="text-xs text-gray-400 mt-1.5 tracking-wide">{notification.time}</p>
      </div>
    </div>
  );
}