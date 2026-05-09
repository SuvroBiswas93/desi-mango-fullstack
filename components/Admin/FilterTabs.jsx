// export default function TabList({ activeTab, setActiveTab }) {
//   return (
//     <div className="flex flex-wrap gap-2 md:gap-4 mb-6 cursor-pointer">
//       {["pending", "confirmed", "delivered"].map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`px-4 py-2 capitalize rounded-lg text-sm md:text-base cursor-pointer ${
//             activeTab === tab ? "bg-blue-600" : "bg-slate-800"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// }


export default function TabList({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "pending", label: "Pending Orders", icon: "⏳" },
    { id: "confirmed", label: "Confirmed Orders", icon: "✓" },
    { id: "delivered", label: "Delivered Orders", icon: "✅" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          }`}
        >
          <span className="text-base">{tab.icon}</span>
          {tab.label}
          {activeTab === tab.id && (
            <span className="ml-1 w-1.5 h-1.5 bg-white rounded-full"></span>
          )}
        </button>
      ))}
    </div>
  );
}