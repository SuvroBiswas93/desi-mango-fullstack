// import Image from "next/image";

// export default function WhyChooseBrass() {
//   const reasons = [
//     {
//       emoji: '🍳',
//       title: 'কেন এই পণ্যটি প্রয়োজন?',
//       description: 'খুন্তি দ্রুত নষ্ট হওয়া বা ডাল ঠিকমতো ঘুটতে না পারার সেরা সমাধান—মজবুত ও টেকসই পিতলের ডালঘুটনি ও খুন্তি।',
//     },
//     {
//       emoji: '📦',
//       title: 'পণ্যে কি কি পাচ্ছেন?',
//       description: '১টি পিতলের ডালঘুটনি ও ১টি পিতলের খুন্তি। ১০০% পিতল দিয়ে তৈরি যা ডাল, ভর্তা ও রান্নায় ব্যবহারযোগ্য।',
//     },
//     {
//       emoji: '✨',
//       title: 'পণ্যের বিশেষ সুবিধা',
//       description: 'মরিচা ধরে না, দীর্ঘদিন ব্যবহারযোগ্য এবং স্বাস্থ্যসম্মত। এটি সহজে পরিষ্কার করা যায় ও কিচেনে প্রিমিয়াম লুক দেয়।',
//     },
//     {
//       emoji: '🏡',
//       title: 'ঐতিহ্যের ছোঁয়া',
//       description: 'আমাদের মায়েদের কিচেনে পিতল ছিল ভরসার নাম। সেই পুরনো দিনের নির্ভরযোগ্যতা এখন আপনার রান্নাঘরে।',
//     },
//   ];

//   return (
//     <section className="w-full py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             কেন ব্যবহার করবেন আমাদের পিতলের পণ্য?
//           </h2>
//           <p className="text-gray-600">ঐতিহ্য এবং গুনাগুণের সঠিক সমন্বয় জানুন</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-center">
          
//           <div className="flex justify-center items-center order-2 md:order-1">
//             <div className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-green-100 border-4 border-white group transition-all duration-500 hover:shadow-green-200/50">
//               <Image
//                 src="/banana.png" 
//                 alt="Brass Utensils"
//                 fill 
//                 priority 
//                 className="object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               {/* Overlay with Text */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
//                 <p className="text-white font-bold text-xl">১০০% খাঁটি পিতলের তৈরি</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Grid - আপনার কার্ডগুলো */}
//           <div className="grid grid-cols-1 gap-5 order-1 md:order-2">
//             {reasons.map((reason, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 hover:-translate-y-1"
//               >
//                 <div className="flex gap-4">
//                   <div className="text-3xl flex-shrink-0">{reason.emoji}</div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-2 tracking-tight text-base md:text-lg">
//                       {reason.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {reason.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyChooseMango() {
  const reasons = [
    {
      emoji: '🥭',
      title: 'কেন আমাদের আম সেরা?',
      description: 'সরাসরি বাগান থেকে বাছাইকৃত আম, যা ফরমালিন ও ক্ষতিকর কার্বাইড মুক্ত। বিষমুক্ত ফ্রেশ আমের আসল স্বাদের নিশ্চয়তা।',
      color: 'border-orange-500'
    },
    {
      emoji: '📦',
      title: 'প্যাকেজিং ও ডেলিভারি',
      description: 'বিশেষভাবে ডিজাইন করা শক্ত কার্টনে আম পাঠানো হয় যাতে পরিবহনে আমের কোনো ক্ষতি না হয়। সারাদেশেই হোম ডেলিভারি সুবিধা।',
      color: 'border-yellow-500'
    },
    {
      emoji: '✨',
      title: 'গুনাগুণ ও মান নিয়ন্ত্রণ',
      description: 'প্রতিটি আম আমরা অভিজ্ঞ লোক দিয়ে চেক করে প্যাক করি। গাছপাকা এবং সঠিক ওজনের ফ্রেশ আম আপনার হাতে পৌঁছানো আমাদের দায়িত্ব।',
      color: 'border-green-500'
    },
    {
      emoji: '🌳',
      title: 'রাজশাহীর ঐতিহ্য',
      description: 'রাজশাহীর নিজস্ব বাগানের ঐতিহ্যবাহী ল্যাংড়া ও গোপালভোগ আমের অনন্য ঘ্রাণ ও মিষ্টতা সরাসরি আপনার ডাইনিং টেবিলে।',
      color: 'border-emerald-500'
    },
  ];

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10 opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-50 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            কেন কিনবেন আমাদের <span className="text-orange-600">রাজশাহীর আম?</span>
          </h2>
          <div className="h-1.5 w-24 bg-green-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Visual Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center items-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-100 border-8 border-white group">
              <Image
                src="/banana.png" // আপনার ইমেজ পাথ এখানে দিন
                alt="Fresh Mangoes"
                fill 
                priority 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Modern Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent flex items-end p-10">
                <div>
                  <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">Premium Quality</span>
                  <p className="text-white font-black text-2xl">রাসায়নিক মুক্ত ও নিরাপদ</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Cards Section */}
          <div className="grid grid-cols-1 gap-6 order-1 lg:order-2">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border-l-8 ${reason.color} hover:shadow-2xl hover:shadow-orange-100 transition-all duration-300 hover:-translate-x-2`}
              >
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:bg-orange-50 transition-colors">
                    {reason.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl tracking-tight group-hover:text-orange-600 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}