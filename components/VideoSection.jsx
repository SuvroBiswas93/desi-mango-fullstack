// export default function VideoSection() {
//   return (
//     <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
//           আমাদের পণ্য কিভাবে তৈরি হয়
//         </h2>

//         <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
//       <iframe
//      className="absolute top-0 left-0 w-full h-full"
//     src="https://www.youtube.com/embed/2InsXYMZ8TI"
//     title="আমাদের পণ্য প্রস্তুতি"
//     frameBorder="0"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     allowFullScreen
//    ></iframe>
//         </div>

//         <p className="text-center text-gray-600 mt-6 text-sm">
//         আমাদের পণ্য সম্পর্কে বিস্তারিত জানতে  ভিডিওটি দেখুন:
//         </p>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 bg-white overflow-hidden">
      {/* Background soft glow elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            বাগান থেকে আপনার <span className="text-orange-500">ডাইনিং টেবিলে</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            আমাদের আম বাছাই থেকে শুরু করে প্যাকিং পর্যন্ত প্রতিটি ধাপের স্বচ্ছতা দেখুন এই ভিডিওতে।
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative group"
        >
          {/* Main Video Frame with Cinematic Shadow */}
          <div className="relative z-10 p-2 md:p-4 bg-white/40 backdrop-blur-md border border-white/20 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-orange-200/50">
            
            {/* Animated Gradient Border Overlay */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-orange-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/Tiujc10McaA?si=V0MPNY22XYwNUrfP"
                title="আমাদের আমের বাগান ও প্রস্তুতি"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Abstract floating elements for "Extra Ordinary" look */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -left-10 w-32 h-32 border-4 border-dashed border-orange-200 rounded-full -z-10"
          ></motion.div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-100 rounded-full -z-10 blur-2xl"></div>
        </motion.div>

        {/* Bottom Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-10">
          {[
            { title: "১০০% ফ্রেশ", desc: "সরাসরি বাগান থেকে বাছাই" },
            { title: "নিরাপদ প্যাকেজিং", desc: "পরিবহনে আমের ক্ষতি হয় না" },
            { title: "দ্রুত ডেলিভারি", desc: "২৪-৪৮ ঘণ্টার মধ্যে পৌঁছে যায়" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="text-center p-4"
            >
              <h4 className="text-orange-600 font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}