// // 

// import { useState } from "react";
// import Image from "next/image";

// export default function ProductDetails() {
//   const [rotate, setRotate] = useState({ x: 0, y: 0 });

//   // সঠিক জায়গায় স্ক্রল করার ফাংশন
//   const scrollToProducts = () => {
//     const element = document.getElementById('products');
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const handleMove = (clientX, clientY, currentTarget) => {
//     const card = currentTarget.getBoundingClientRect();
//     const x = (clientX - card.left) / card.width;
//     const y = (clientY - card.top) / card.height;
//     const rotateX = (y - 0.5) * 20;
//     const rotateY = (x - 0.5) * -20;
//     setRotate({ x: rotateX, y: rotateY });
//   };

//   const handleMouseMove = (e) => handleMove(e.clientX, e.clientY, e.currentTarget);
//   const handleTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
//   const resetRotate = () => setRotate({ x: 0, y: 0 });

//   const problems = [
//     "খুন্তি দ্রুত নষ্ট হয়ে যায়",
//     "ডাল ঠিকমতো ঘাটা যায় না",
//     "সস্তা জিনিস বারবার কিনতে হয়",
//     "রান্নার সময় হাত ব্যথা হয়ে যায়",
//     "ভালোভাবে নেড়েচেড়ে রান্না করা যায় না",
//     "প্রোডাক্টে মরিচা ধরে যায়",
//     "দেখতে ভালো লাগে না, কিচেনের লুক নষ্ট হয়"
//   ];

//   const solutions = [
//     "মজবুত ও টেকসই",
//     "সহজে ব্যবহারযোগ্য",
//     "দীর্ঘদিন নিশ্চিন্তে ব্যবহার",
//     "মরিচা ধরে না",
//     "স্বাস্থ্যসম্মত ও নিরাপদ",
//     "সহজে পরিষ্কার করা যায়",
//     "কিচেনে প্রিমিয়াম লুক দেয়"
//   ];

//   return (
//     <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-emerald-50 via-white to-green-50">
//       <div className="max-w-6xl mx-auto">
//         <div className="p-6 md:p-12 rounded-3xl shadow-xl shadow-green-100/50 border border-green-50 bg-white/40 backdrop-blur-sm">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
//             <div className="space-y-6">
//               <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
//                 রান্নার সময় কি এমন সমস্যায় পড়েন?
//               </h2>

//               <div className="space-y-3">
//                 {problems.map((item, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <span className="flex-shrink-0 text-red-500">❌</span>
//                     <span className="text-gray-700 font-medium">{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="pt-6">
//                 <h3 className="text-xl font-bold text-green-700 mb-4 bg-green-100/50 inline-block px-4 py-2 rounded-xl">
//                   👉 সমাধান একটাই — পিতলের সেট
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {solutions.map((item, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <span className="text-green-600">✔️</span>
//                       <span className="text-gray-700 text-sm font-bold">{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center gap-6 pt-8 border-t border-green-100">
//                 <div className="text-left">
//                   <p className="text-xs text-gray-400 uppercase font-bold">মূল্য</p>
//                   <p className="text-3xl font-black text-green-700">৳১০৪০</p>
//                 </div>
//                 <div className="h-12 w-[1px] bg-green-100"></div>
//                 <div className="text-left">
//                   <p className="text-xs text-gray-400 uppercase font-bold">পরিমাণ</p>
//                   <p className="text-xl font-bold text-gray-800">সেট (২টি)</p>
//                 </div>
//               </div>
//             </div>

//             <div 
//               className="flex justify-center items-center [perspective:1000px]"
//               onMouseMove={handleMouseMove}
//               onMouseLeave={resetRotate}
//               onTouchMove={handleTouchMove}
//               onTouchEnd={resetRotate}
//             >
//               <div 
//                 className="relative w-full max-w-sm aspect-square bg-white rounded-[2.5rem] shadow-2xl p-6 transition-transform duration-200 ease-out border border-white flex flex-col justify-center items-center shadow-green-200/50"
//                 style={{
//                   transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
//                   transformStyle: "preserve-3d"
//                 }}
//               >
//                 <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full font-black shadow-xl transform rotate-12 z-20 [transform:translateZ(60px)]">
//                   Premium
//                 </div>
//                 <div className="relative w-full h-full overflow-hidden rounded-3xl flex items-center justify-center [transform:translateZ(40px)]">
//                   <Image 
//                     src="/gopalvhog.png" 
//                     alt="Product" 
//                     width={320} 
//                     height={320} 
//                     style={{ height: "auto" }}
//                     className="object-contain" 
//                   />
//                 </div>
//                 <div className="mt-6 text-center [transform:translateZ(30px)]">
//                   <p className="text-gray-900 font-black text-xl">পিওর পিতল</p>
//                   <p className="text-green-600 font-bold">সেরা কোয়ালিটির নিশ্চয়তা</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-center mt-12">
//             {/* এখানে বাটনটি আপডেট করা হয়েছে */}
//             <button
//               onClick={scrollToProducts}
//               className="w-full md:w-auto px-12 py-5 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-2xl shadow-[0_20px_50px_-15px_rgba(22,163,74,0.5)] transition-all active:scale-95"
//             >
//               অর্ডার করুন এখনই
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// import { useState } from "react";
// import Image from "next/image";

// export default function ProductDetails() {
//   const [rotate, setRotate] = useState({ x: 0, y: 0 });

//   // সঠিক জায়গায় স্ক্রল করার ফাংশন
//   const scrollToProducts = () => {
//     const element = document.getElementById('products');
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const handleMove = (clientX, clientY, currentTarget) => {
//     const card = currentTarget.getBoundingClientRect();
//     const x = (clientX - card.left) / card.width;
//     const y = (clientY - card.top) / card.height;
//     const rotateX = (y - 0.5) * 20;
//     const rotateY = (x - 0.5) * -20;
//     setRotate({ x: rotateX, y: rotateY });
//   };

//   const handleMouseMove = (e) => handleMove(e.clientX, e.clientY, e.currentTarget);
//   const handleTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
//   const resetRotate = () => setRotate({ x: 0, y: 0 });

//   const problems = [
//     "বাজারে কেমিক্যালযুক্ত আমের ভয়",
//     "মিষ্টির নামে টক আম কেনা",
//     "কার্বাইড দিয়ে পাকানো আম স্বাস্থ্যের ক্ষতি করে",
//     "ওজনে কারচুপি ও সঠিক দাম না পাওয়া",
//     "আমের ভেতরে পোকা বা পচন ধরা",
//     "বাগান থেকে সরাসরি সংগ্রহের সুযোগ নেই",
//     "আসল গোপালভোগের স্বাদ ও ঘ্রাণ না পাওয়া"
//   ];

//   const solutions = [
//     "১০০% ফরমালিন ও কেমিক্যাল মুক্ত",
//     "অতুলনীয় মিষ্টি ও সুস্বাদু",
//     "সরাসরি রাজশাহীর নিজস্ব বাগান থেকে",
//     "গাছপাকা ফ্রেশ আমের নিশ্চয়তা",
//     "স্বাস্থ্যসম্মত ও পুষ্টিকর",
//     "সঠিক ওজন ও গুণমান নিশ্চিত",
//     "প্রিমিয়াম প্যাকেজিং ও দ্রুত ডেলিভারি"
//   ];

//   return (
//     <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
//       <div className="max-w-6xl mx-auto">
//         <div className="p-6 md:p-12 rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-50 bg-white/40 backdrop-blur-sm">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
//             <div className="space-y-6">
//               <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
//                 আম কিনতে গিয়ে কি এমন দুশ্চিন্তায় পড়েন?
//               </h2>

//               <div className="space-y-3">
//                 {problems.map((item, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <span className="flex-shrink-0 text-red-500">❌</span>
//                     <span className="text-gray-700 font-medium">{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="pt-6">
//                 <h3 className="text-xl font-bold text-orange-700 mb-4 bg-orange-100/50 inline-block px-4 py-2 rounded-xl">
//                   👉 সমাধান আমাদের কাছে — প্রিমিয়াম গোপালভোগ
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {solutions.map((item, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <span className="text-green-600">✔️</span>
//                       <span className="text-gray-700 text-sm font-bold">{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center gap-6 pt-8 border-t border-orange-100">
//                 <div className="text-left">
//                   <p className="text-xs text-gray-400 uppercase font-bold">মূল্য (কেজি)</p>
//                   <p className="text-3xl font-black text-orange-600">৳১১০</p>
//                 </div>
//                 <div className="h-12 w-[1px] bg-orange-100"></div>
//                 <div className="text-left">
//                   <p className="text-xs text-gray-400 uppercase font-bold">ন্যূনতম অর্ডার</p>
//                   <p className="text-xl font-bold text-gray-800">৫ কেজি</p>
//                 </div>
//               </div>
//             </div>

//             <div 
//               className="flex justify-center items-center [perspective:1000px]"
//               onMouseMove={handleMouseMove}
//               onMouseLeave={resetRotate}
//               onTouchMove={handleTouchMove}
//               onTouchEnd={resetRotate}
//             >
//               <div 
//                 className="relative w-full max-w-sm aspect-square bg-white rounded-[2.5rem] shadow-2xl p-6 transition-transform duration-200 ease-out border border-white flex flex-col justify-center items-center shadow-orange-200/50"
//                 style={{
//                   transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
//                   transformStyle: "preserve-3d"
//                 }}
//               >
//                 <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full font-black shadow-xl transform rotate-12 z-20 [transform:translateZ(60px)]">
//                   Original
//                 </div>
//                 <div className="relative w-full h-full overflow-hidden rounded-3xl flex items-center justify-center [transform:translateZ(40px)]">
//                   <Image 
//                     src="/gopalvhog.png" 
//                     alt="Gopalvhog Mango" 
//                     width={320} 
//                     height={320} 
//                     style={{ height: "auto" }}
//                     className="object-contain transition-transform duration-500 hover:scale-105" 
//                   />
//                 </div>
//                 <div className="mt-6 text-center [transform:translateZ(30px)]">
//                   <p className="text-gray-900 font-black text-xl">রাজশাহীর গোপালভোগ</p>
//                   <p className="text-orange-600 font-bold">বিশুদ্ধ স্বাদের প্রতিশ্রুতি</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-center mt-12">
//             <button
//               onClick={scrollToProducts}
//               className="w-full md:w-auto px-12 py-5 bg-orange-600 hover:bg-orange-700 text-white font-black text-lg rounded-2xl shadow-[0_20px_50px_-15px_rgba(234,88,12,0.5)] transition-all active:scale-95"
//             >
//               অর্ডার করুন এখনই
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import Image from "next/image";

export default function ProductDetails() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMove = (clientX, clientY, currentTarget) => {
    const card = currentTarget.getBoundingClientRect();
    const x = (clientX - card.left) / card.width;
    const y = (clientY - card.top) / card.height;
    setRotate({ x: (y - 0.5) * 15, y: (x - 0.5) * -15 });
  };

  const resetRotate = () => setRotate({ x: 0, y: 0 });

  return (
    <section className="w-full py-16 md:py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Professional Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-orange-600 font-bold tracking-widest uppercase text-sm px-3 py-1 bg-orange-50 rounded-lg">
                Premium Quality
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
                আসল রাজশাহীর <br />
                <span className="text-orange-600">গোপালভোগ</span> আম
              </h2>
              <p className="text-lg text-slate-600 font-medium">
                বাজারের কেমিক্যালযুক্ত আম নিয়ে আর নয় দুশ্চিন্তা। আমরা দিচ্ছি সরাসরি বাগান থেকে বাছাই করা ফ্রেশ আমের নিশ্চয়তা।
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-red-50 border border-red-100">
                <h4 className="text-red-700 font-bold mb-3 flex items-center gap-2">
                  <span>⚠️</span> সাধারণ আমের সমস্যা
                </h4>
                <ul className="text-sm text-red-600/80 space-y-2 font-medium">
                  <li>• ক্ষতিকর কার্বাইড ও ফরমালিন</li>
                  <li>• ওজনে কম পাওয়ার ভয়</li>
                  <li>• মিষ্টির বদলে টক বা পানসে</li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <h4 className="text-emerald-700 font-bold mb-3 flex items-center gap-2">
                  <span>✅</span> আমাদের সমাধান
                </h4>
                <ul className="text-sm text-emerald-600/80 space-y-2 font-medium">
                  <li>• ১০০% প্রাকৃতিকভাবে পাকানো</li>
                  <li>• সঠিক ডিজিটাল ওজন মাপ</li>
                  <li>• প্রিমিয়াম ক্যারেট প্যাকেজিং</li>
                </ul>
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">৳১১০</span>
                <span className="text-slate-500 font-bold">/কেজি</span>
              </div>
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-10 py-5 bg-orange-600 hover:bg-orange-600 text-white font-black text-xl rounded-2xl transition-all duration-300 shadow-xl shadow-orange-200"
              >
                অর্ডার করুন এখনই
              </button>
            </div>
          </div>

          {/* Right Side: Clean 3D Image Showcase */}
          <div 
            className="w-full lg:w-1/2 flex justify-center [perspective:1200px]"
            onMouseMove={(e) => handleMove(e.clientX, e.clientY, e.currentTarget)}
            onMouseLeave={resetRotate}
          >
            <div 
              className="relative w-full max-w-md aspect-square rounded-[4rem] bg-gradient-to-br from-orange-100 to-yellow-50 p-12 transition-transform duration-500 ease-out shadow-[0_50px_100px_-20px_rgba(234,88,12,0.15)] flex items-center justify-center border-8 border-white"
              style={{ 
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-20"></div>
              
              <Image 
                src="/gopalvhog.png" 
                alt="Rajshahi Mango" 
                width={450} 
                height={450} 
                priority
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] [transform:translateZ(50px)]"
              />

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-3xl shadow-2xl [transform:translateZ(80px)] border border-orange-50">
                <p className="text-orange-600 font-black text-2xl">১০০%</p>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter">অর্গানিক ফ্রেশ</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}