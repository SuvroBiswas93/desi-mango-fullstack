// "use client";

// import AddProductForm from "@/components/Forms/AddProductForm";
// import Link from "next/link";
// import { useAuth } from "@/lib/firebase/AuthContext";

// export default function AddProductPage() {
//   const { currentUser, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
//         <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
//           <h1 className="text-2xl font-bold mb-3">Admin login required</h1>
//           <p className="text-slate-400 mb-6">
//             Product manage korte admin account diye login korte hobe.
//           </p>
//           <Link
//             href="/admin"
//             className="inline-flex w-full justify-center rounded-lg bg-green-600 px-4 py-3 font-bold text-white transition hover:bg-green-700"
//           >
//             Go to Admin Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white text-slate-100 p-6 md:p-12">
//       <nav className="max-w-4xl mx-auto flex justify-between items-center mb-10 bg-slate-900/50 p-4 px-6 rounded-xl border border-slate-800 backdrop-blur-md">
//         <Link
//           href="/admin"
//           className="text-xl font-bold text-green-400 hover:text-green-500"
//         >
//           Dashboard
//         </Link>
//         <Link
//           href="/"
//           className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition"
//         >
//           Landing Page
//         </Link>
//       </nav>

//       <main className="max-w-2xl mx-auto">
//         <AddProductForm />
//       </main>
//     </div>
//   );
// }


"use client";

import AddProductForm from "@/components/Forms/AddProductForm";
import Link from "next/link";
import { useAuth } from "@/lib/firebase/AuthContext";

export default function AddProductPage() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Admin login required</h1>
          <p className="text-gray-500 mb-6">
            Product manage korte admin account diye login korte hobe.
          </p>
          <Link
            href="/admin"
            className="inline-flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <nav className="max-w-4xl mx-auto flex justify-between items-center mb-10 bg-white shadow-sm p-4 px-6 rounded-xl border border-gray-100">
        <Link
          href="/admin"
          className="text-xl font-bold text-indigo-600 hover:text-indigo-700"
        >
          Dashboard
        </Link>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition"
        >
          Landing Page
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto">
        <AddProductForm />
      </main>
    </div>
  );
}