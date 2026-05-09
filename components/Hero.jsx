
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";

// export default function Hero({ onOrderClick }) {
//   const [typedText, setTypedText] = useState("");
//   const fullText = "রাজশাহীর  ল্যাংড়া আম!";

//   useEffect(() => {
//     let currentChar = 0;
//     let completedLoops = 0;

//     const typeText = () => {
//       const interval = setInterval(() => {
//         setTypedText(fullText.slice(0, currentChar + 1));
//         currentChar++;

//         if (currentChar === fullText.length) {
//           clearInterval(interval);

//           setTimeout(() => {
//             completedLoops++;

//             if (completedLoops < 20) {
//               currentChar = 0;
//               setTypedText("");
//               typeText();
//             }
//           }, 1200);
//         }
//       }, 70);
//     };

//     typeText();
//     return () => clearInterval(); // Cleanup on unmount
//   }, []);

//   return (
//     <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-yellow-50 via-white to-green-50">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Image Section */}
//           <div className="flex justify-center items-center">
//             <div className="relative w-full max-w-sm aspect-square bg-white rounded-3xl shadow-2xl p-4 transition-all duration-500 hover:shadow-yellow-200/50">
//               <div className="relative w-full h-full overflow-hidden rounded-2xl">
//                 <Image
//                   src="/langra.png"
//                   fill
//                   priority
//                   alt="Rajshahi Langra Mango"
//                   className="object-cover transition-transform duration-700 hover:scale-110"
//                 />
//               </div>
//               {/* Badge */}
//               <div className="absolute -top-4 -right-4 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform rotate-6">
//                 সেরা স্বাদ!
//               </div>
//             </div>
//           </div>

//           {/* Right Description */}
//           <div className="space-y-6">
//             <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full font-medium">
//               <span>✅</span>
//               <span className="text-sm uppercase tracking-wider">
//                 ১০০% ফরমালিন মুক্ত ও ফ্রেশ
//               </span>
//             </div>

//             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//               জিভে জল আনা একদম বাগানের
//               <br />
//               <span className="text-orange-700">{typedText}</span>
//               <span className="animate-pulse text-orange-700">|</span>
//             </h1>

//             <p className="text-gray-600 leading-relaxed text-lg">
//               “আমের রাজা ল্যাংড়া! এর পাতলা খোসা, ছোট আঁটি আর অতুলনীয় সুমিষ্ট গন্ধ 
//               আপনাকে মুগ্ধ করবেই। আমরা সরাসরি রাজশাহীর বাগান থেকে বাছাইকৃত 
//               সেরা আমটি আপনার দুয়ারে পৌঁছে দিচ্ছি। রাসায়নিকমুক্ত এবং গাছপাকা 
//               আমের আসল স্বাদ পেতে আজই আপনার অর্ডারটি কনফার্ম করুন।”
//             </p>

//             {/* Pricing Section */}
//             <div className="flex items-center gap-6 py-4">
//               <div className="text-left">
//                 <p className="text-sm text-gray-500 uppercase">মূল্য (কেজি)</p>
//                 <p className="text-3xl font-bold text-green-700">৳১২০</p>
//               </div>
//               <div className="h-10 w-[1px] bg-gray-300"></div>
//               <div className="text-left">
//                 <p className="text-sm text-gray-500 uppercase">মিনিমাম অর্ডার</p>
//                 <p className="text-xl font-semibold text-gray-800">৫ কেজি</p>
//               </div>
//             </div>

//             <motion.a
//               href="#products"
//               initial={{ x: 0 }}
//               animate={{
//                 x: [0, -4, 4, -4, 4, 0],
//               }}
//               transition={{
//                 duration: 0.4,
//                 repeat: 9,
//                 repeatType: "loop",
//                 ease: "linear",
//                 delay: 0.5,
//               }}
//               whileHover={{
//                 scale: 1.05,
//                 x: [0, -4, 4, -4, 4, 0],
//                 transition: { repeat: Infinity, duration: 0.4 },
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full md:w-auto px-10 py-4  bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 block md:inline-block text-center cursor-pointer"
//             >
//               অর্ডার করুন এখনই
//             </motion.a>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-gray-200">
//           {[
//             { label: "সন্তুষ্ট ক্রেতা", value: "৫০০০+" },
//             { label: "সফল ডেলিভারি", value: "১০০০০+" },
//             { label: "বাগান থেকে সরাসরি", value: "১০০%" },
//             { label: "ক্যাশ অন ডেলিভারি", value: "সারাদেশে" },
//           ].map((stat, i) => (
//             <div key={i} className="text-center group">
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
//                 {stat.value}
//               </p>
//               <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero({ onOrderClick }) {
  const [typedText, setTypedText] = useState("");
  const fullText = "রাজশাহীর  ল্যাংড়া আম!";

  useEffect(() => {
    let currentChar = 0;
    let completedLoops = 0;

    const typeText = () => {
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, currentChar + 1));
        currentChar++;

        if (currentChar === fullText.length) {
          clearInterval(interval);

          setTimeout(() => {
            completedLoops++;

            if (completedLoops < 20) {
              currentChar = 0;
              setTypedText("");
              typeText();
            }
          }, 1200);
        }
      }, 70);
    };

    typeText();
    return () => clearInterval();
  }, []);

  return (
    <section className="relative w-full min-h-screen py-12 px-4 md:px-8 bg-gradient-to-br from-yellow-50 via-white to-green-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Main Content - Left Side */}
          <div className="flex-1 space-y-8 z-10 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-yellow-100/80 backdrop-blur-sm text-yellow-700 px-5 py-2 rounded-full font-medium border border-yellow-200"
            >
              <span className="text-lg">🏆</span>
              <span className="text-sm uppercase tracking-wider">
                ১০০% ফরমালিন মুক্ত ও ফ্রেশ
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-black text-gray-900 leading-tight"
            >
              জিভে জল আনা 
              <br />
              একদম বাগানের
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="animate-pulse text-orange-600">|</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 leading-relaxed text-lg max-w-xl"
            >
              "আমের রাজা ল্যাংড়া! এর পাতলা খোসা, ছোট আঁটি আর অতুলনীয় সুমিষ্ট গন্ধ 
              আপনাকে মুগ্ধ করবেই। আমরা সরাসরি রাজশাহীর বাগান থেকে বাছাইকৃত 
              সেরা আমটি আপনার দুয়ারে পৌঁছে দিচ্ছি।"
            </motion.p>

            {/* Pricing Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex-1 min-w-[140px] bg-white rounded-2xl p-5 shadow-lg border border-yellow-100">
                <p className="text-sm text-gray-500 uppercase mb-2">মূল্য (কেজি)</p>
                <p className="text-4xl font-black text-green-700">৳১২০</p>
                <p className="text-xs text-gray-400 mt-1">ফ্রেশ ও গাছপাকা</p>
              </div>
              <div className="flex-1 min-w-[140px] bg-white rounded-2xl p-5 shadow-lg border border-yellow-100">
                <p className="text-sm text-gray-500 uppercase mb-2">মিনিমাম অর্ডার</p>
                <p className="text-4xl font-black text-gray-800">৫ কেজি</p>
                <p className="text-xs text-gray-400 mt-1">সরাসরি বাগান থেকে</p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.a
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              href="#products"
              whileHover={{
                scale: 1.05,
                x: [0, -4, 4, -4, 4, 0],
                transition: { repeat: Infinity, duration: 0.4 },
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-bold rounded-2xl shadow-xl shadow-yellow-200/50 cursor-pointer transition-all duration-300 group"
            >
              অর্ডার করুন এখনই
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </div>

          {/* Image Section - Right Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="flex-1 flex justify-center items-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-yellow-100 to-green-50 rounded-full p-8 shadow-2xl border-4 border-white">
                <div className="relative w-full h-full overflow-hidden rounded-full">
                  <Image
                    src="/langra.png"
                    fill
                    priority
                    alt="Rajshahi Langra Mango"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-5 py-2.5 rounded-full font-bold shadow-xl transform rotate-6"
                >
                  সেরা স্বাদ!
                </motion.div>
              </div>

              {/* Decorative Dots */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-green-200 rounded-full opacity-50"></div>
              <div className="absolute top-1/2 -right-10 w-8 h-8 bg-orange-200 rounded-full opacity-50"></div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section - Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-200/50"
        >
          {[
            { label: "সন্তুষ্ট ক্রেতা", value: "৫,০০০+", icon: "😊" },
            { label: "সফল ডেলিভারি", value: "১০,০০০+", icon: "📦" },
            { label: "বাগান থেকে সরাসরি", value: "১০০%", icon: "🌳" },
            { label: "ক্যাশ অন ডেলিভারি", value: "সারাদেশে", icon: "💰" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="text-center group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 p-4">
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <p className="text-3xl md:text-4xl font-black text-gray-900 group-hover:text-green-600 transition-colors">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm mt-2 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}