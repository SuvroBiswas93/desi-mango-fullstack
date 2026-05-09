// import Image from "next/image";

// export default function SecondHero({ onOrderClick }) {
//   return (
//     <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-gray-900 overflow-hidden">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="text-white space-y-8">
//             {/* Halal Badge */}
//             <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
//               <span className="text-xl">✅</span>
//               <span className="font-medium">শতভাগ পিওর ম্যাটেরিয়াল </span>
//             </div>

//             <div className="space-y-4">
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                 আপনার কিচেনে বহুল ব্যবহৃত <br className="hidden md:block" />
//                 <span className="text-green-500">পিতলের প্রোডাক্ট</span>
//               </h1>
//               <p className="text-gray-300 text-lg leading-relaxed max-w-md">
//                 প্রতিদিনের রান্নার জন্য প্রয়োজন টেকসই ও নির্ভরযোগ্য কিচেন টুল। পিতলের ডাল ঘুটনি ও খুন্তি আপনাকে দিচ্ছে সেই নিশ্চয়তা।

//               এখনই অর্ডার করুনএবং রান্নাকে করুন আরও সহজও আরামদায়ক।
//               </p>
//             </div>

//             {/* Price & Quantity Grid */}
//             <div className="flex gap-4">
//               <div className="bg-white/5 border border-white/10 p-5 rounded-2xl min-w-[120px]">
//                 <p className="text-gray-400 text-sm mb-1">পরিমাণ</p>
//                 <p className="text-xl font-bold">২টি</p>
//               </div>
//               <div className="bg-green-600/20 border border-green-600/50 p-5 rounded-2xl min-w-[120px]">
//                 <p className="text-green-400 text-sm mb-1">মূল্য</p>
//                 <p className="text-xl font-bold">৳১০৪০ </p>
//               </div>
//             </div>

//             <a
//               href="#products"
//               className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg shadow-green-900/50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
//             >
//               অর্ডার করুন এখনই
//             </a>
//           </div>

//           {/* Right Image */}
//           <div className="relative w-full aspect-[4/5] md:aspect-square lg:max-w-md mx-auto">
//             <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-transparent rounded-3xl opacity-20 blur-2xl"></div>
//             <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
//               <Image
//                 src="/himsagor.png"
//                 alt="Gorur Mangsher Jhura Achhar"
//                 fill
//                 className="object-cover transition-transform duration-700 hover:scale-110"
//               />
//               {/* Overlay Gradient */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//               <div className="absolute bottom-6 left-6">
//                 <p className="text-white font-bold text-xl">
//                   কিচেন টুল প্রোডাক্ট

//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import Image from "next/image";
import { motion } from "framer-motion";

export default function SecondHero({ onOrderClick }) {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white space-y-8 order-2 lg:order-1">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20 backdrop-blur-sm">
              <span className="text-xl">⭐</span>
              <span className="font-medium text-orange-400">১০০% ফরমালিন মুক্ত ও ফ্রেশ</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                রাজশাহীর সেরা স্বাদের <br className="hidden md:block" />
                <span className="text-orange-500">হিমসাগর ও ল্যাংড়া</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                সরাসরি বাগান থেকে বাছাইকৃত বিষমুক্ত আম। আমাদের আমের প্রতিটি কামড়ে পাবেন প্রকৃতির আসল স্বাদ ও অতুলনীয় ঘ্রাণ। 

                পরিবারের সুস্থতায় আজই সংগ্রহ করুন কেমিক্যালমুক্ত প্রিমিয়াম কোয়ালিটি আম।
              </p>
            </div>

            {/* Price & Weight Info */}
            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl min-w-[120px]">
                <p className="text-gray-500 text-sm mb-1">ন্যূনতম অর্ডার</p>
                <p className="text-xl font-bold">১০ কেজি</p>
              </div>
              <div className="bg-orange-600/20 border border-orange-600/50 p-5 rounded-3xl min-w-[120px]">
                <p className="text-orange-400 text-sm mb-1">শুরু মাত্র</p>
                <p className="text-xl font-bold">৳৯৫০</p>
              </div>
            </div>
              <a
  href="#products"
  onClick={onOrderClick}
  className="inline-block px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-2xl shadow-xl shadow-orange-900/20 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg uppercase tracking-wider text-center cursor-pointer"
>
  অর্ডার করুন এখনই
</a>
           
          </div>

          {/* Right Image */}
          <div className="relative w-full aspect-square lg:max-w-md mx-auto order-1 lg:order-2">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-transparent rounded-[3rem] opacity-20 blur-3xl"></div>
            
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/5 group">
              <Image
                src="/himsagor.png" 
                alt="Premium Rajshahi Mangoes"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1 w-8 bg-orange-500 rounded-full"></div>
                  <p className="text-orange-400 font-bold tracking-widest text-xs uppercase">Limited Stock</p>
                </div>
                <p className="text-white font-black text-2xl">
                  এক্সপোর্ট কোয়ালিটি আম
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-yellow-400 text-black h-24 w-24 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-slate-950 z-10"
            >
              <span className="font-black text-xl leading-none">Best</span>
              <span className="font-bold text-sm leading-none uppercase">Seller</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}