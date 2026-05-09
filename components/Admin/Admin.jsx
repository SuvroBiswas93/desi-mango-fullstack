// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";
// import StatsCard from "./StatsCard";
// import TabList from "./FilterTabs";
// import OrderTable from "./OrderTable";
// import { useAuth } from "../../lib/firebase/AuthContext";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth } from "../../lib/firebase/firebase.config";

// // Simple icon placeholders - you can replace these with Lucide-react or Heroicons
// const DashboardIcon = () => (
//   <svg
//     className="w-5 h-5"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//     />
//   </svg>
// );

// const PlusIcon = () => (
//   <svg
//     className="w-5 h-5"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M12 4v16m8-8H4"
//     />
//   </svg>
// );

// const MenuIcon = () => (
//   <svg
//     className="w-6 h-6"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M4 6h16M4 12h16M4 18h16"
//     />
//   </svg>
// );

// const CloseIcon = () => (
//   <svg
//     className="w-6 h-6"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M6 18L18 6M6 6l12 12"
//     />
//   </svg>
// );

// export default function Admin() {
//   const { currentUser, loading } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [activeTab, setActiveTab] = useState("pending");
//   const [data, setData] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({ orders: 0, products: 0, revenue: 0 });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [courierLoadingId, setCourierLoadingId] = useState(null);
//   const [isCheckingCourier, setIsCheckingCourier] = useState(false);
//   const [courierMessage, setCourierMessage] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginError("");
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       if (typeof window !== "undefined") {
//         localStorage.setItem("adminAuth", "true");
//       }
//     } catch (err) {
//       setLoginError("ভুল ইমেইল বা পাসওয়ার্ড");
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("adminAuth");
//     }
//     setEmail("");
//     setPassword("");
//     setLoginError("");
//     setIsSidebarOpen(false);
//   };

//   const getAuthHeader = async () => {
//     const token = await currentUser.getIdToken();
//     return { Authorization: `Bearer ${token}` };
//   };

//   const fetchStats = async () => {
//     try {
//       const authHeader = await getAuthHeader();
//       const fetchWithCheck = async (url) => {
//         const res = await fetch(url, { headers: authHeader });
//         const data = await res.json().catch(() => null);
//         if (!res.ok) {
//           throw new Error(data?.error || data?.message || `Fetch failed: ${res.status}`);
//         }
//         return data;
//       };
//       const [oRes, pRes, rRes] = await Promise.all([
//         fetchWithCheck("/api/admin/total-orders"),
//         fetchWithCheck("/api/admin/total-products"),
//         fetchWithCheck("/api/admin/total-revenue"),
//       ]);
//       setStats({
//         orders: oRes.count || 0,
//         products: pRes.count || 0,
//         revenue: rRes.revenue || 0,
//       });
//     } catch (err) {
//       console.error("Stats load failed:", err.message);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const authHeader = await getAuthHeader();
//       const res = await fetch(
//         `/api/orders?status=${activeTab}&page=${currentPage}&limit=10&search=${debouncedSearch}`,
//         { headers: authHeader },
//       );
//       const result = await res.json();
//       if (!res.ok) {
//         throw new Error(result?.message || result?.error || `Fetch failed: ${res.status}`);
//       }
//       if (result.orders) {
//         setData(result.orders);
//         setTotalPages(result.totalPages || 1);
//       }
//     } catch (err) {
//       console.error("Data load failed", err);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       fetchStats();
//       fetchData();
//     }
//   }, [activeTab, currentUser, currentPage, debouncedSearch]);

//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeTab, debouncedSearch]);

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (isSidebarOpen && window.innerWidth < 1024) {
//         const sidebar = document.getElementById("mobile-sidebar");
//         const toggleButton = document.getElementById("sidebar-toggle");
//         if (
//           sidebar &&
//           !sidebar.contains(e.target) &&
//           toggleButton &&
//           !toggleButton.contains(e.target)
//         ) {
//           setIsSidebarOpen(false);
//         }
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isSidebarOpen]);

//   // Prevent body scroll when sidebar is open on mobile
//   useEffect(() => {
//     if (isSidebarOpen && window.innerWidth < 1024) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isSidebarOpen]);

//   const handleUpdateStatus = async (id, newStatus) => {
//     const authHeader = await getAuthHeader();
//     const res = await fetch(`/api/orders/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json", ...authHeader },
//       body: JSON.stringify({ status: newStatus }),
//     });
//     if (res.ok) fetchData();
//   };

//   const handleSendToCourier = async (id) => {
//     setCourierLoadingId(id);
//     setCourierMessage(null);
//     try {
//       const authHeader = await getAuthHeader();
//       const res = await fetch(`/api/orders/${id}/send-courier`, {
//         method: "POST",
//         headers: authHeader,
//       });
//       const result = await res.json().catch(() => null);

//       if (!res.ok) {
//         throw new Error(result?.message || "Courier send failed");
//       }

//       setCourierMessage({
//         type: "success",
//         text: result?.message || "Order sent to courier successfully",
//       });
//       fetchData();
//       fetchStats();
//     } catch (err) {
//       setCourierMessage({
//         type: "error",
//         text: err.message || "Courier send failed",
//       });
//     } finally {
//       setCourierLoadingId(null);
//     }
//   };

//   const handleCheckCourierStatus = async (id) => {
//     setCourierLoadingId(id);
//     setCourierMessage(null);
//     try {
//       const authHeader = await getAuthHeader();
//       const res = await fetch(`/api/orders/${id}/courier-status`, {
//         headers: authHeader,
//       });
//       const result = await res.json().catch(() => null);

//       if (!res.ok) {
//         throw new Error(result?.message || "Courier status check failed");
//       }

//       setCourierMessage({
//         type: "success",
//         text: `Courier status: ${result?.deliveryStatus || "unknown"}`,
//       });
//       fetchData();
//     } catch (err) {
//       setCourierMessage({
//         type: "error",
//         text: err.message || "Courier status check failed",
//       });
//     } finally {
//       setCourierLoadingId(null);
//     }
//   };

//   const handleCheckCourierBalance = async () => {
//     setIsCheckingCourier(true);
//     setCourierMessage(null);
//     try {
//       const authHeader = await getAuthHeader();
//       const res = await fetch("/api/courier/balance", {
//         headers: authHeader,
//       });
//       const result = await res.json().catch(() => null);

//       if (!res.ok) {
//         throw new Error(result?.message || "Courier credential check failed");
//       }

//       setCourierMessage({
//         type: "success",
//         text: `Courier API connected. Balance: ${result?.currentBalance ?? 0}`,
//       });
//     } catch (err) {
//       setCourierMessage({
//         type: "error",
//         text: err.message || "Courier credential check failed",
//       });
//     } finally {
//       setIsCheckingCourier(false);
//     }
//   };

//   const handleDeleteOrder = async (id) => {
//     if (!window.confirm("আপনি কি নিশ্চিতভাবে এই অর্ডারটি ডিলিট করতে চান?"))
//       return;
//     try {
//       const authHeader = await getAuthHeader();
//       const res = await fetch(`/api/orders/${id}`, {
//         method: "DELETE",
//         headers: authHeader,
//       });
//       if (res.ok) {
//         fetchData();
//         fetchStats();
//       }
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center p-6">
//         <div className="w-full max-w-md bg-[#161B26] border border-white/5 rounded-2xl shadow-2xl p-8">
//           <div className="text-center mb-8">
//             <div className="inline-flex p-3 bg-blue-500/10 rounded-xl mb-4 text-blue-500">
//               <DashboardIcon />
//             </div>
//             <h1 className="text-2xl font-bold text-white">অ্যাডমিন প্যানেল</h1>
//             <p className="text-slate-400 text-sm mt-1">
//               আপনার অ্যাকাউন্ট লগইন করুন
//             </p>
//           </div>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-[#0B0F1A] border border-white/5 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-[#0B0F1A] border border-white/5 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 required
//               />
//             </div>
//             {loginError && (
//               <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded">
//                 {loginError}
//               </p>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
//             >
//               লগইন
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // Sidebar content component to avoid duplication
//   const SidebarContent = () => (
//     <div className="flex flex-col h-full">
//       {/* Top Section - Logo */}
//       <div className="p-8">
//         <Link
//           href="/"
//           className="inline-flex items-center gap-3 text-xl font-bold text-white tracking-tight hover:opacity-90 transition"
//           onClick={() => setIsSidebarOpen(false)}
//         >
//           <div className="w-10 h-10 bg-amber-600/20 border border-amber-600/30 rounded-lg flex items-center justify-center text-amber-500 shadow-inner">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="1.5"
//                 d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
//               />
//             </svg>
//           </div>
//           <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
//             দেশি আম
//           </span>
//         </Link>
//       </div>

//       {/* Middle Section - Navigation (pushes logout to bottom) */}
//       <nav className="flex-1 px-4 space-y-1.5">
//         <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 ml-4">
//           Main Menu
//         </div>

//         <button className="flex items-center gap-3 w-full p-3.5 bg-blue-600/10 text-blue-500 rounded-xl font-semibold transition-all border border-blue-500/10">
//           <DashboardIcon /> Dashboard
//         </button>

//         <Link
//           href="/AddProduct"
//           className="flex items-center gap-3 w-full p-3.5 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all group"
//           onClick={() => setIsSidebarOpen(false)}
//         >
//           <div className="group-hover:rotate-90 transition-transform duration-300">
//             <PlusIcon />
//           </div>
//           Add Product
//         </Link>
//       </nav>

//       {/* Bottom Section - Logout Button (sticks to bottom) */}
//       <div className="p-4 border-t border-white/5 bg-[#0D111A] mt-auto">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 w-full p-3.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-medium"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//             />
//           </svg>
//           Logout
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-[#0B0F1A] text-slate-200">
//       {/* Desktop Sidebar - Always visible on lg screens */}
//       <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-white/5 lg:bg-[#111622] lg:shadow-xl lg:fixed lg:inset-y-0 lg:z-30 ">
//         <div className="h-full overflow-y-auto">
//           <SidebarContent />
//         </div>
//       </aside>

//       {/* Mobile Sidebar - Overlay with smooth transition */}
//       <>
//         {/* Backdrop */}
//         <div
//           className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
//             isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
//           }`}
//           onClick={() => setIsSidebarOpen(false)}
//         />

//         {/* Sidebar for mobile */}
//         <aside
//           id="mobile-sidebar"
//           className={`fixed top-0 left-0 w-72 h-full bg-[#111622] border-r border-white/5 shadow-2xl z-50 transition-transform duration-300 ease-in-out transform lg:hidden ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all z-50"
//           >
//             <CloseIcon />
//           </button>
//           <div className="h-full overflow-y-auto">
//             <SidebarContent />
//           </div>
//         </aside>
//       </>

//       {/* Main Content Area */}
//       <main className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-72">
//         {/* Top Header */}
//         <header className="h-16 border-b border-white/5 bg-[#111622]/50 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
//           <div className="flex items-center gap-3">
//             {/* Mobile Menu Button */}
//             <button
//               id="sidebar-toggle"
//               onClick={() => setIsSidebarOpen(true)}
//               className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
//               aria-label="Open menu"
//             >
//               <MenuIcon />
//             </button>
//             <h1 className="text-lg font-semibold text-white">Overview</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">
//               Admin Online
//             </span>
//           </div>
//         </header>

//         <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <StatsCard title="Total Orders" value={stats.orders} />
//             <StatsCard title="Total Products" value={stats.products} />
//             <StatsCard
//               title="Revenue"
//               value={"৳" + stats.revenue.toLocaleString()}
//             />
//           </div>

//           {/* Content Section */}
//           <section className="bg-[#111622] border border-white/5 rounded-2xl shadow-sm overflow-hidden">
//             <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <TabList activeTab={activeTab} setActiveTab={setActiveTab} />

//               <div className="relative w-full md:w-72">
//                 <input
//                   type="text"
//                   placeholder="Search orders..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full bg-[#0B0F1A] border border-white/10 pl-10 pr-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//                 <svg
//                   className="w-4 h-4 absolute left-3 top-2.5 text-slate-500"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               <button
//                 onClick={handleCheckCourierBalance}
//                 disabled={isCheckingCourier}
//                 className="px-4 py-2 bg-amber-600/20 text-amber-400 hover:bg-amber-600 hover:text-white rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
//               >
//                 {isCheckingCourier ? "Checking..." : "Check Courier API"}
//               </button>
//             </div>

//             <div className="p-0 md:p-2">
//               {courierMessage && (
//                 <div
//                   className={`m-4 rounded-lg border px-4 py-3 text-sm ${
//                     courierMessage.type === "success"
//                       ? "border-green-500/20 bg-green-500/10 text-green-400"
//                       : "border-red-500/20 bg-red-500/10 text-red-400"
//                   }`}
//                 >
//                   {courierMessage.text}
//                 </div>
//               )}
//               <OrderTable
//                 data={data}
//                 activeTab={activeTab}
//                 onView={setSelectedOrder}
//                 onUpdateStatus={handleUpdateStatus}
//                 onSendToCourier={handleSendToCourier}
//                 onCheckCourierStatus={handleCheckCourierStatus}
//                 onDelete={handleDeleteOrder}
//                 courierLoadingId={courierLoadingId}
//               />
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="p-6 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
//                 <p className="text-sm text-slate-500">
//                   Page {currentPage} of {totalPages}
//                 </p>
//                 <div className="flex gap-2">
//                   <button
//                     disabled={currentPage === 1}
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.max(1, prev - 1))
//                     }
//                     className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     disabled={currentPage === totalPages}
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//                     }
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition disabled:opacity-30 disabled:cursor-not-allowed"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </section>
//         </div>
//       </main>

//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//         />
//       )}
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";
import StatsCard from "./StatsCard";
import TabList from "./FilterTabs";
import OrderTable from "./OrderTable";
import { useAuth } from "../../lib/firebase/AuthContext";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase.config";

// Clean icon components
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function Admin() {
  const { currentUser, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("pending");
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({ orders: 0, products: 0, revenue: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [courierLoadingId, setCourierLoadingId] = useState(null);
  const [isCheckingCourier, setIsCheckingCourier] = useState(false);
  const [courierMessage, setCourierMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("adminAuth", "true");
      }
    } catch (err) {
      setLoginError("ভুল ইমেইল বা পাসওয়ার্ড");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminAuth");
    }
    setEmail("");
    setPassword("");
    setLoginError("");
    setIsSidebarOpen(false);
  };

  const getAuthHeader = async () => {
    const token = await currentUser.getIdToken();
    return { Authorization: `Bearer ${token}` };
  };

  const fetchStats = async () => {
    try {
      const authHeader = await getAuthHeader();
      const fetchWithCheck = async (url) => {
        const res = await fetch(url, { headers: authHeader });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.error || data?.message || `Fetch failed: ${res.status}`);
        }
        return data;
      };
      const [oRes, pRes, rRes] = await Promise.all([
        fetchWithCheck("/api/admin/total-orders"),
        fetchWithCheck("/api/admin/total-products"),
        fetchWithCheck("/api/admin/total-revenue"),
      ]);
      setStats({
        orders: oRes.count || 0,
        products: pRes.count || 0,
        revenue: rRes.revenue || 0,
      });
    } catch (err) {
      console.error("Stats load failed:", err.message);
    }
  };

  const fetchData = async () => {
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch(
        `/api/orders?status=${activeTab}&page=${currentPage}&limit=10&search=${debouncedSearch}`,
        { headers: authHeader },
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.message || result?.error || `Fetch failed: ${res.status}`);
      }
      if (result.orders) {
        setData(result.orders);
        setTotalPages(result.totalPages || 1);
      }
    } catch (err) {
      console.error("Data load failed", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchStats();
      fetchData();
    }
  }, [activeTab, currentUser, currentPage, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById("mobile-sidebar");
        const toggleButton = document.getElementById("sidebar-toggle");
        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          toggleButton &&
          !toggleButton.contains(e.target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const handleUpdateStatus = async (id, newStatus) => {
    const authHeader = await getAuthHeader();
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeader },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchData();
  };

  const handleSendToCourier = async (id) => {
    setCourierLoadingId(id);
    setCourierMessage(null);
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch(`/api/orders/${id}/send-courier`, {
        method: "POST",
        headers: authHeader,
      });
      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Courier send failed");
      }

      setCourierMessage({
        type: "success",
        text: result?.message || "Order sent to courier successfully",
      });
      fetchData();
      fetchStats();
    } catch (err) {
      setCourierMessage({
        type: "error",
        text: err.message || "Courier send failed",
      });
    } finally {
      setCourierLoadingId(null);
    }
  };

  const handleCheckCourierStatus = async (id) => {
    setCourierLoadingId(id);
    setCourierMessage(null);
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch(`/api/orders/${id}/courier-status`, {
        headers: authHeader,
      });
      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Courier status check failed");
      }

      setCourierMessage({
        type: "success",
        text: `Courier status: ${result?.deliveryStatus || "unknown"}`,
      });
      fetchData();
    } catch (err) {
      setCourierMessage({
        type: "error",
        text: err.message || "Courier status check failed",
      });
    } finally {
      setCourierLoadingId(null);
    }
  };

  const handleCheckCourierBalance = async () => {
    setIsCheckingCourier(true);
    setCourierMessage(null);
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch("/api/courier/balance", {
        headers: authHeader,
      });
      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Courier credential check failed");
      }

      setCourierMessage({
        type: "success",
        text: `Courier API connected. Balance: ${result?.currentBalance ?? 0}`,
      });
    } catch (err) {
      setCourierMessage({
        type: "error",
        text: err.message || "Courier credential check failed",
      });
    } finally {
      setIsCheckingCourier(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই অর্ডারটি ডিলিট করতে চান?"))
      return;
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: authHeader,
      });
      if (res.ok) {
        fetchData();
        fetchStats();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <span className="text-white text-2xl font-bold">D</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Deshi Aam</h1>
            <p className="text-gray-500 text-sm mt-1">Admin Portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition"
              required
            />
            {loginError && (
              <p className="text-rose-600 text-sm bg-rose-50 p-3 rounded-xl">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 py-3 rounded-xl text-white font-semibold transition-all shadow-lg active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <div>
            <span className="block font-bold text-gray-800">Deshi Aam</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <button className="flex items-center gap-3 w-full p-3 bg-rose-50 text-rose-600 rounded-xl font-medium">
          <DashboardIcon /> Dashboard
        </button>
        <Link
          href="/AddProduct"
          className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"
          onClick={() => setIsSidebarOpen(false)}
        >
          <PlusIcon /> Add Product
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"
        >
          <LogoutIcon /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30 lg:bg-white lg:border-r lg:border-gray-100">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <>
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-all lg:hidden ${
            isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <aside
          id="mobile-sidebar"
          className={`fixed top-0 left-0 w-72 h-full bg-white z-50 transition-transform transform lg:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
          <SidebarContent />
        </aside>
      </>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              id="sidebar-toggle"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <MenuIcon />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AD</span>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid - Using your existing StatsCard component */}
            {/* Stats Grid - Redesigned without relying on StatsCard styling */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Total Orders Card */}
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <span className="text-3xl font-bold text-blue-600">📦</span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Orders</h3>
    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.orders}</p>
    <div className="mt-4 pt-3 border-t border-gray-100">
      <span className="text-xs text-green-600">↑ +12% from last month</span>
    </div>
  </div>

  {/* Total Products Card */}
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <span className="text-3xl font-bold text-emerald-600">🛍️</span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Products</h3>
    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.products}</p>
    <div className="mt-4 pt-3 border-t border-gray-100">
      <span className="text-xs text-gray-500">Available in inventory</span>
    </div>
  </div>

  {/* Revenue Card */}
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className="text-3xl font-bold text-amber-600">💰</span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Revenue</h3>
    <p className="text-3xl font-bold text-gray-800 mt-2">৳{stats.revenue.toLocaleString()}</p>
    <div className="mt-4 pt-3 border-t border-gray-100">
      <span className="text-xs text-green-600">Total lifetime sales</span>
    </div>
  </div>
</div>

          {/* Content Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <TabList activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                />
                <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button
                onClick={handleCheckCourierBalance}
                disabled={isCheckingCourier}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {isCheckingCourier ? "Checking..." : "Check Courier"}
              </button>
            </div>

            <div className="p-4">
              {courierMessage && (
                <div
                  className={`mb-4 rounded-lg px-4 py-3 text-sm ${
                    courierMessage.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {courierMessage.text}
                </div>
              )}
              
              <OrderTable
                data={data}
                activeTab={activeTab}
                onView={setSelectedOrder}
                onUpdateStatus={handleUpdateStatus}
                onSendToCourier={handleSendToCourier}
                onCheckCourierStatus={handleCheckCourierStatus}
                onDelete={handleDeleteOrder}
                courierLoadingId={courierLoadingId}
              />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm transition disabled:opacity-30"
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm transition disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}