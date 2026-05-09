// import { motion } from "framer-motion";

// export default function SafetySection() {
//   return (
//     <section className="w-full py-20 px-4 md:px-8 bg-gray-50 overflow-hidden">
//       <div className="max-w-6xl mx-auto">
//         {/* Heading Section - এটি নিচ থেকে ওপরে উঠবে */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//             আমাদের সেবা ও নিশ্চয়তা
//           </h2>
//           <p> দেরি না করে এখনই অর্ডার করুন!</p>
//         </motion.div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
//           {/* Hygiene Card - বাম দিক থেকে আসবে */}
//           <motion.div 
//             initial={{ opacity: 0, x: -300 }} 
//             whileInView={{ opacity: 1, x: 0 }}   
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-green-500 hover:shadow-xl transition-all duration-300"
//           >
//             <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
//               🔒
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">
//               আমাদের প্রতিশ্রুতি
//             </h3>
//             <p className="text-gray-600 leading-relaxed">
//               ✔️ ১০০% কোয়ালিটি নিশ্চিত<br />
//               ✔️ সমস্যা হলে রিপ্লেসমেন্ট সুবিধা<br />
//               ✔️ গ্রাহক সন্তুষ্টিই আমাদের লক্ষ্য<br />
//             </p>
//           </motion.div>

//           {/* Delivery Card - ডান দিক থেকে আসবে */}
//           <motion.div 
//             initial={{ opacity: 0, x: 300 }}  
//             whileInView={{ opacity: 1, x: 0 }}  
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300"
//           >
//             <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
//               🚚
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">
//               ডেলিভারি তথ্য
//             </h3>
//             <p className="text-gray-600 leading-relaxed">
//               🚚 সারা বাংলাদেশে হোম ডেলিভারি<br />
//               💰 ক্যাশ অন ডেলিভারি <br />
//               📦 ২-৪ দিনের মধ্যে ডেলিভারি<br />
//             </p>
//           </motion.div>
          
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";

export default function SafetySection() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 "
        >
          <span className="text-orange-600 font-bold tracking-widest uppercase text-sm ">সুরক্ষা ও সেবা</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 py-4">
            আমাদের ডেলিভারি ও নিশ্চয়তা
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Quality Card - স্লাইড ইন ফ্রম লেফট */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }} 
            whileInView={{ opacity: 1, x: 0 }}   
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border-b-8 border-green-500 hover:shadow-2xl hover:shadow-green-100 transition-all duration-300 group"
          >
            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300">
              🛡️
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-6">
              আমাদের প্রতিশ্রুতি
            </h3>
            <ul className="space-y-4 text-gray-600 font-medium">
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-xl font-bold">✓</span> সরাসরি বাগান থেকে শতভাগ বিশুদ্ধ আম
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-xl font-bold">✓</span> কোনো আম নষ্ট বের হলে ইনস্ট্যান্ট রিপ্লেসমেন্ট
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-xl font-bold">✓</span> কেমিক্যাল বা ফরমালিন মুক্ত আমের নিশ্চয়তা
              </li>
            </ul>
          </motion.div>

          {/* Delivery Card - স্লাইড ইন ফ্রম রাইট */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}  
            whileInView={{ opacity: 1, x: 0 }}  
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border-b-8 border-orange-500 hover:shadow-2xl hover:shadow-orange-100 transition-all duration-300 group"
          >
            <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300">
              🚚
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-6">
              ডেলিভারি সংক্রান্ত তথ্য
            </h3>
            <ul className="space-y-4 text-gray-600 font-medium">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 text-xl font-bold">📦</span> আম যেন না থেঁতলায় সে জন্য মজবুত প্যাকেজিং
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 text-xl font-bold">💰</span> হাতে পেয়ে টাকা পরিশোধ (ক্যাশ অন ডেলিভারি)
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 text-xl font-bold">⚡</span> ৪৮ থেকে ৭২ ঘণ্টার মধ্যে সারাদেশের পৌঁছে যাবে
              </li>
            </ul>
          </motion.div>
          
        </div>

        {/* Bottom CTA Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-gray-500 font-bold italic"
        >
          * আপনার আমের স্বাদ ও নিরাপত্তা নিশ্চিত করাই আমাদের প্রধান দায়িত্ব।
        </motion.p>
      </div>
    </section>
  );
}