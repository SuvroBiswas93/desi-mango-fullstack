// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// const navItems = [
//   { label: 'হোম', href: '/#home' },
//   // { label: 'পণ্য', href: '/#products' },
//   { label: 'বৈশিষ্ট্য', href: '/#how' },
//   { label: 'উপকারিতা', href: '/#packaging' },
//   { label: 'পছন্দের কারণ', href: '/#why' },
//   { label: 'অর্ডার করুন', href:  '/#products'  },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 px-4 py-1">
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 backdrop-blur-md bg-green-900/10 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-full transition-colors duration-300">
//         <Link href="/#home" className="text-lg font-bold tracking-tight text-slate-900 drop-shadow-sm">
//            দেশি আম
//         </Link>

//         <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-800">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="rounded-full px-4 py-2 transition hover:bg-green-600/20 hover:text-green-950 shadow-sm active:shadow-inner"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <button
//           type="button"
//           aria-label={open ? 'Close menu' : 'Open menu'}
//           onClick={() => setOpen((current) => !current)}
//           className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-green-600/10 text-slate-900 shadow-md transition hover:bg-green-600/20 md:hidden"
//         >
//           <span className="text-xl">{open ? '✕' : '☰'}</span>
//         </button>
//       </div>

//       {open && (
//         <div className="mt-2 md:hidden rounded-3xl border border-white/20 bg-green-50/80 backdrop-blur-xl shadow-xl overflow-hidden">
//           <div className="space-y-1 px-3 py-3">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className="block rounded-2xl px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-green-600/10 shadow-sm mb-1"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'হোম', href: '/#home' },
  { label: 'বৈশিষ্ট্য', href: '/#how' },
  { label: 'উপকারিতা', href: '/#packaging' },
  { label: 'পছন্দের কারণ', href: '/#why' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo Section - Professional & Clean */}
        <Link href="/#home" className="flex items-center group">
          <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">
             দেশি<span className="text-orange-600 font-extrabold">আম</span>
          </span>
        </Link>

        {/* Desktop Navigation - Minimalist */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          
          {/* Action Button - Serious Styling */}
          <Link
            href="/#products"
            className="bg-slate-900 text-white px-6 py-2 rounded text-sm font-bold hover:bg-orange-600 transition-all duration-300"
          >
            অর্ডার করুন
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="md:hidden p-2 text-slate-900"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown - Clean List Style */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-slate-800 border-b border-gray-50 pb-2 hover:text-orange-600"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#products"
              onClick={() => setOpen(false)}
              className="bg-orange-600 text-white text-center py-3 rounded font-bold"
            >
              অর্ডার করুন
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}