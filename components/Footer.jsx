// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full bg-gray-900 text-gray-300 py-12 px-4 md:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">অ্যান্টিক প্রোডাক্ট</h3>
//             <p className="text-gray-400 leading-relaxed">
//              "ঐতিহ্যবাহী নকশা ও নিখুঁত ফিনিশিংয়ের সেরা সব অ্যান্টিক কালেকশন এখন আপনার হাতের নাগালে।"
//             </p>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">যোগাযোগ</h3>
//             <div className="space-y-3">
//               <p className="flex items-center gap-2">
//                 <span className="text-green-500">📍</span>
//                 Tangail, Dhaka, Bangladesh
//               </p>
//               <p className="flex items-center gap-2">
//                 <span className="text-green-500">📱</span>
//                 01616123500
//               </p>
//               <p className="flex items-center gap-2">
//                 <span className="text-green-500">💬</span>
//                 ক্যাশ অন ডেলিভারি উপলব্ধ
//               </p>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">গুরুত্বপূর্ণ লিঙ্ক</h3>
//             <div className="space-y-2">
//               <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors">
//                 গোপনীয়তা নীতি
//               </a>
//               <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors">
//                 শর্ত এবং শর্তাবলী
//               </a>
//               <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors">
//                 ফেরত নীতি
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-700 my-8"></div>

//         {/* Bottom Footer */}
//         <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
//           <p>
//             © {currentYear} দেশি আম। সর্বাধিকার সংরক্ষিত।
//           </p>
//           <div className="flex gap-6 mt-4 md:mt-0">
//             <a href="#" className="hover:text-green-500 transition-colors">
//               ফেসবুক
//             </a>
//             <a href="#" className="hover:text-green-500 transition-colors">
//               হোয়াটসঅ্যাপ
//             </a>
//             <a href="#" className="hover:text-green-500 transition-colors">
//               ইনস্টাগ্রাম
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


'use client';
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Send
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] text-gray-400 pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h3 className="text-3xl font-black text-white tracking-tighter">
                দেশি<span className="text-orange-500">আম</span>
              </h3>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-sm font-medium">
              রাজশাহীর প্রিমিয়াম কোয়ালিটির বিষমুক্ত আম সরাসরি বাগান থেকে আপনার দোরগোড়ায়। আমরা শতভাগ বিশুদ্ধতা ও স্বাদের নিশ্চয়তা দিই।
            </p>
            {/* Social Icons with Tooltips Style */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 group">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 group">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all duration-300 group">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-8">গুরুত্বপূর্ণ লিঙ্ক</h4>
            <ul className="space-y-4">
              {['গোপনীয়তা নীতি', 'শর্ত এবং শর্তাবলী', 'ফেরত নীতি', 'আমাদের সম্পর্কে'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm flex items-center group hover:text-orange-500 transition-colors">
                    <ChevronRight size={14} className="mr-1 text-orange-500/50 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-8">যোগাযোগ</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-orange-500/10 p-2 rounded-lg">
                  <MapPin size={16} className="text-orange-500" />
                </div>
                <span className="text-sm leading-snug">উপশহর, রাজশাহী,<br /> বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-orange-500/10 p-2 rounded-lg">
                  <Phone size={16} className="text-orange-500" />
                </div>
                <span className="text-sm font-semibold text-gray-300">০১৬১৬১২৩৫০০</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-orange-500/10 p-2 rounded-lg">
                  <Mail size={16} className="text-orange-500" />
                </div>
                <span className="text-sm">support@desiaam.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter / Trust Badge */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-sm font-bold text-white mb-4">অফার পেতে জয়েন করুন</h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              নতুন সিজনের আম এবং বিশেষ ডিসকাউন্ট সম্পর্কে সবার আগে জানতে সাবস্ক্রাইব করুন।
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল" 
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-all"
              />
              <button className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded-lg transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-gray-500 text-center md:text-left">
            © {currentYear} <span className="text-orange-500">দেশি আম</span>। ডিজাইন ও ডেভেলপমেন্ট করেছেন আপনার টিম।
          </p>
          
          {/* Payment Badges (Placeholder icons for professionalism) */}

        </div>
      </div>
    </footer>
  );
}