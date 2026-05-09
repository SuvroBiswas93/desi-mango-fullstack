
// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function MangoBenefits({ onOrderClick }) {
//   const benefits = [
//     {
//       icon: "🌳",
//       title: "সরাসরি বাগান থেকে সংগ্রহ",
//       text: "কোনো মধ্যস্বত্বভোগী নেই! আমরা সরাসরি রাজশাহীর বাগান থেকে বাছাইকৃত আম আপনার দুয়ারে পৌঁছে দেই।",
//       color: "green",
//     },
//     {
//       icon: "🧪",
//       title: "শতভাগ কেমিক্যাল মুক্ত",
//       text: "আমাদের আমে কোনো ফরমালিন বা বিষাক্ত কার্বাইড ব্যবহার করা হয় না। প্রাকৃতিকভাবে পাকা আমের আসল স্বাদ পাবেন।",
//       color: "green",
//     },
//     {
//       icon: "👅",
//       title: "অতুলনীয় স্বাদ ও ঘ্রাণ",
//       text: "দেশি আমের আসল বৈশিষ্ট্য হলো এর মিষ্টি স্বাদ এবং মন মাতানো ঘ্রাণ, যা বাজারের সাধারণ আমে পাওয়া দুষ্কর।",
//       color: "green",
//     },
//     {
//       icon: "🥗",
//       title: "পুষ্টি ও রোগ প্রতিরোধ",
//       text: "আমে রয়েছে প্রচুর ভিটামিন ও অ্যান্টিঅক্সিডেন্ট, যা শরীরের ক্লান্তি দূর করে এবং রোগ প্রতিরোধ ক্ষমতা বাড়ায়।",
//       color: "orange",
//     },
//   ];

//   return (
//     <section className="relative w-full py-20 px-4 md:px-8 overflow-hidden">
//       {/* Background Layers */}
//       <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50/30 to-green-50/50"></div>
//       <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Section Header with Decorative Elements */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
//             কেন আমরা সেরা?
//           </span>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
//             কেন আমাদের দেশি আম <br />
//             <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
//               বেছে নেবেন?
//             </span>
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
//             আমরা নিশ্চিত করি প্রতিটি আম যেন হয় ফ্রেশ, মিষ্টি এবং স্বাস্থ্যের জন্য সম্পূর্ণ নিরাপদ।
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
//           {/* Benefits Grid - Takes 3 columns */}
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4"
//           >
//             {benefits.map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="group relative"
//               >
//                 <div className="h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
//                   {/* Icon Container */}
//                   <div className="flex items-start gap-4">
//                     <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
//                       benefit.color === "orange"
//                         ? "bg-orange-100 text-orange-600"
//                         : "bg-green-100 text-green-600"
//                     }`}>
//                       {benefit.icon}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-orange-600 transition-colors">
//                         {benefit.title}
//                       </h3>
//                       <p className="text-gray-600 leading-relaxed text-sm">
//                         {benefit.text}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}

//             {/* CTA Button inside grid for mobile */}
//             <motion.a
//               href="#products"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.5 }}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="sm:col-span-2 w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold rounded-xl shadow-lg shadow-orange-200 text-lg cursor-pointer transition-all duration-300 group"
//             >
//               <span>অর্ডার করুন এখনই</span>
//               <span className="group-hover:translate-x-1 transition-transform">→</span>
//             </motion.a>
//           </motion.div>

//           {/* Image Section - Takes 2 columns */}
//           <motion.div 
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-2 flex justify-center lg:sticky lg:top-24"
//           >
//             <div className="relative w-full max-w-md">
//               {/* Main Image Card */}
//               <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
//                 <Image
//                   src="/desiAam.png"
//                   alt="Fresh Desi Mango Benefits"
//                   fill
//                   priority
//                   className="object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

//                 {/* Image Content Overlay */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-2xl">⭐</span>
//                     <span className="text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
//                       বেস্ট সেলার
//                     </span>
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-black mb-1">সুস্বাদু ও স্বাস্থ্যসম্মত</h3>
//                   <p className="text-sm text-white/80">বাগান থেকে বাছাইকৃত সেরা আম</p>
//                 </div>

//                 {/* Floating Badge */}
//                 <motion.div 
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                   className="absolute top-6 right-6 bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow-lg text-sm"
//                 >
//                   🔥 ১০০% ফ্রেশ
//                 </motion.div>
//               </div>

//               {/* Decorative Elements */}
//               <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-200 rounded-full opacity-30 -z-10"></div>
//               <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-200 rounded-full opacity-30 -z-10"></div>

//               {/* Feature Points */}
//               <div className="mt-6 space-y-3">
//                 {[
//                   { icon: "✅", text: "ফরমালিন মুক্ত" },
//                   { icon: "✅", text: "গাছপাকা আম" },
//                   { icon: "✅", text: "সরাসরি বাগান থেকে" },
//                 ].map((point, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.8 + i * 0.1 }}
//                     className="flex items-center gap-2 text-gray-700 font-medium"
//                   >
//                     <span>{point.icon}</span>
//                     <span>{point.text}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MangoBenefits({ onOrderClick }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 5,
    minutes: 0,
    seconds: 0
  });
  const [isActive, setIsActive] = useState(true);

  const benefits = [
    {
      icon: "🌳",
      title: "সরাসরি বাগান থেকে সংগ্রহ",
      text: "কোনো মধ্যস্বত্বভোগী নেই! আমরা সরাসরি রাজশাহীর বাগান থেকে বাছাইকৃত আম আপনার দুয়ারে পৌঁছে দেই।",
      color: "green",
    },
    {
      icon: "🧪",
      title: "শতভাগ কেমিক্যাল মুক্ত",
      text: "আমাদের আমে কোনো ফরমালিন বা বিষাক্ত কার্বাইড ব্যবহার করা হয় না। প্রাকৃতিকভাবে পাকা আমের আসল স্বাদ পাবেন।",
      color: "green",
    },
    {
      icon: "👅",
      title: "অতুলনীয় স্বাদ ও ঘ্রাণ",
      text: "দেশি আমের আসল বৈশিষ্ট্য হলো এর মিষ্টি স্বাদ এবং মন মাতানো ঘ্রাণ, যা বাজারের সাধারণ আমে পাওয়া দুষ্কর।",
      color: "green",
    },
    {
      icon: "🥗",
      title: "পুষ্টি ও রোগ প্রতিরোধ",
      text: "আমে রয়েছে প্রচুর ভিটামিন ও অ্যান্টিঅক্সিডেন্ট, যা শরীরের ক্লান্তি দূর করে এবং রোগ প্রতিরোধ ক্ষমতা বাড়ায়।",
      color: "orange",
    },
  ];

  // Timer logic
useEffect(() => {
  let timer;

  if (isActive) {
    timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        // Timer finished
        if (
          days === 0 &&
          hours === 0 &&
          minutes === 0 &&
          seconds === 0
        ) {
          setIsActive(false);

          setTimeout(() => {
            setTimeLeft({
              days: 2,
              hours: 5,
              minutes: 0,
              seconds: 0,
            });

            setIsActive(true);
          }, 1000);

          return prev;
        }

        // Seconds decrease
        if (seconds > 0) {
          return {
            ...prev,
            seconds: seconds - 1,
          };
        }

        // Minutes decrease
        if (minutes > 0) {
          return {
            ...prev,
            minutes: minutes - 1,
            seconds: 59,
          };
        }

        // Hours decrease
        if (hours > 0) {
          return {
            ...prev,
            hours: hours - 1,
            minutes: 59,
            seconds: 59,
          };
        }

        // Days decrease
        if (days > 0) {
          return {
            days: days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }

        return prev;
      });
    }, 1000);
  }

  return () => clearInterval(timer);
}, [isActive]);

  // Format numbers with leading zeros
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section className="relative w-full py-20 px-4 md:px-8 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50/30 to-green-50/50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Decorative Elements */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
            কেন আমরা সেরা?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
            কেন আমাদের দেশি আম <br />
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              বেছে নেবেন?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            আমরা নিশ্চিত করি প্রতিটি আম যেন হয় ফ্রেশ, মিষ্টি এবং স্বাস্থ্যের জন্য সম্পূর্ণ নিরাপদ।
          </p>
        </motion.div>

        {/* Exclusive Offer Timer Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-5 md:px-8 md:py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left Side - Text */}
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-2xl md:text-3xl">🎉</span>
                    <h3 className="text-white font-black text-xl md:text-2xl">
                      এক্সক্লুসিভ অফার!
                    </h3>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-bold">
                      সীমিত সময়
                    </span>
                  </div>
                  <p className="text-white/90 text-sm md:text-base mt-1">
                    অর্ডার করলে পাচ্ছেন অতিরিক্ত ১০% ডিসকাউন্ট
                  </p>
                </div>

                {/* Right Side - Timer */}
                 <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">

  {/* দিন */}
  <div className="flex flex-col items-center">
    <div className="w-[62px] h-[62px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px]
      rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20
      shadow-lg flex items-center justify-center">
      
      <span className="text-white text-2xl sm:text-3xl md:text-4xl font-black font-mono">
        {formatNumber(timeLeft.days)}
      </span>
    </div>

    <p className="mt-2 text-[11px] sm:text-xs md:text-sm text-orange-100 font-semibold">
      দিন
    </p>
  </div>

  <span className="text-white text-2xl sm:text-3xl font-black mb-5">:</span>

  {/* ঘণ্টা */}
  <div className="flex flex-col items-center">
    <div className="w-[62px] h-[62px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px]
      rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20
      shadow-lg flex items-center justify-center">

      <span className="text-white text-2xl sm:text-3xl md:text-4xl font-black font-mono">
        {formatNumber(timeLeft.hours)}
      </span>
    </div>

    <p className="mt-2 text-[11px] sm:text-xs md:text-sm text-orange-100 font-semibold">
      ঘণ্টা
    </p>
  </div>

  <span className="text-white text-2xl sm:text-3xl font-black mb-5">:</span>

  {/* মিনিট */}
  <div className="flex flex-col items-center">
    <div className="w-[62px] h-[62px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px]
      rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20
      shadow-lg flex items-center justify-center">

      <span className="text-white text-2xl sm:text-3xl md:text-4xl font-black font-mono">
        {formatNumber(timeLeft.minutes)}
      </span>
    </div>

    <p className="mt-2 text-[11px] sm:text-xs md:text-sm text-orange-100 font-semibold">
      মিনিট
    </p>
  </div>

  <span className="text-white text-2xl sm:text-3xl font-black mb-5">:</span>

  {/* সেকেন্ড */}
  <div className="flex flex-col items-center">
    <div className="w-[62px] h-[62px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px]
      rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20
      shadow-lg flex items-center justify-center">

      <span className="text-white text-2xl sm:text-3xl md:text-4xl font-black font-mono">
        {formatNumber(timeLeft.seconds)}
      </span>
    </div>

    <p className="mt-2 text-[11px] sm:text-xs md:text-sm text-orange-100 font-semibold">
      সেকেন্ড
    </p>
  </div>

</div>
              
                {/* Optional: Toggle Button (Can hide the timer section) */}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Benefits Grid - Takes 3 columns */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* Icon Container */}
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                      benefit.color === "orange"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}>
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-orange-600 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA Button inside grid for mobile */}
            <motion.a
              href="#products"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="sm:col-span-2 w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold rounded-xl shadow-lg shadow-orange-200 text-lg cursor-pointer transition-all duration-300 group"
            >
              <span>অর্ডার করুন এখনই</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>

          {/* Image Section - Takes 2 columns */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex justify-center lg:sticky lg:top-24"
          >
            <div className="relative w-full max-w-md">
              {/* Main Image Card */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/desiAam.png"
                  alt="Fresh Desi Mango Benefits"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Image Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">⭐</span>
                    <span className="text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      বেস্ট সেলার
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-1">সুস্বাদু ও স্বাস্থ্যসম্মত</h3>
                  <p className="text-sm text-white/80">বাগান থেকে বাছাইকৃত সেরা আম</p>
                </div>

                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-6 right-6 bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow-lg text-sm"
                >
                  🔥 ১০০% ফ্রেশ
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-200 rounded-full opacity-30 -z-10"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-200 rounded-full opacity-30 -z-10"></div>

              {/* Feature Points */}
              <div className="mt-6 space-y-3">
                {[
                  { icon: "✅", text: "ফরমালিন মুক্ত" },
                  { icon: "✅", text: "গাছপাকা আম" },
                  { icon: "✅", text: "সরাসরি বাগান থেকে" },
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-2 text-gray-700 font-medium"
                  >
                    <span>{point.icon}</span>
                    <span>{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}