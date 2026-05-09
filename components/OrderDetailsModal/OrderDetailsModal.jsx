// import React from "react";

// export default function OrderDetailsModal({ order, onClose }) {
//   if (!order) return null;

//   // ডাটাবেজের ফিল্ডগুলো সেফটি চেক করে নেওয়া
//   const { customer, products, subtotal, total, shipping, orderDate, _id, orderId } =
//     order;
//   const displayOrderId = orderId || _id?.$oid || _id?.toString() || "N/A";

//   return (
//     <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col text-slate-200">
//         {/* Header */}
//         <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800">
//           <div>
//             <h2 className="text-lg font-bold text-white">অর্ডার ডিটেইলস</h2>
//             <p className="text-xs text-slate-400">ID: #{displayOrderId}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-slate-400 hover:text-white text-3xl transition cursor-pointer"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="p-6 overflow-y-auto space-y-6">
//           {/* Customer & Payment Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//               <h4 className="text-slate-400 text-xs uppercase font-bold mb-2">
//                 কাস্টমার তথ্য
//               </h4>
//               <p className="text-white font-semibold text-lg">
//                 {customer?.name || "N/A"}
//               </p>
//               <p className="text-slate-300">📞 {customer?.phone || "N/A"}</p>
//               <p className="text-slate-400 text-sm mt-1 break-words">
//                 📍 {customer?.address || "N/A"}
//               </p>
//             </div>

//             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//               <h4 className="text-slate-400 text-xs uppercase font-bold mb-2">
//                 পেমেন্ট ও নোট
//               </h4>
//               <p className="text-white font-semibold">
//                 {customer?.paymentMethod || "ক্যাশ অন ডেলিভারি"}
//               </p>
//               <p className="text-slate-400 text-xs italic mt-2">
//                 নোট: {customer?.note || "কোনো নোট নেই"}
//               </p>
//             </div>
//           </div>

//           {/* Products List */}
//           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//             <h4 className="text-slate-400 text-xs uppercase font-bold mb-3">
//               পণ্যসমূহ ({products?.length || 0})
//             </h4>
//             <div className="space-y-3">
//               {products?.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-slate-700"
//                 >
//                   <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = "/placeholder-image.png";
//                       }}
//                     />
//                   </div>
//                   <div className="flex-grow">
//                     <p className="text-white font-medium">{item.name}</p>
//                     <div className="flex flex-wrap gap-3 text-slate-400 text-xs mt-1">
//                       <span>ওজন: {item.weight || "N/A"}</span>
//                       <span className="font-bold text-slate-200">
//                         পরিমাণ: {item.quantity || 1}
//                       </span>
//                       <span className="text-slate-500">
//                         PID: {item._id?.$oid || item._id?.toString?.() || item.id || "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-green-400 font-bold">
//                       ৳{(item.price * (item.quantity || 1)).toLocaleString()}
//                     </p>
//                     <p className="text-slate-500 text-[10px]">
//                       ৳{item.price} × {item.quantity || 1}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-2">
//             <div className="flex justify-between text-slate-400">
//               <span>সাবটোটাল</span>
//               <span>৳{subtotal?.toLocaleString() || 0}</span>
//             </div>
//             <div className="flex justify-between text-slate-400">
//               <span>শিপিং চার্জ</span>
//               <span>৳{shipping?.toLocaleString() || 0}</span>
//             </div>
//             <div className="flex justify-between text-white text-xl font-bold border-t border-slate-700 pt-2 mt-1">
//               <span>মোট</span>
//               <span className="text-green-400">
//                 ৳{total?.toLocaleString() || 0}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-4 bg-slate-800 border-t border-slate-700 text-center text-slate-500 text-xs">
//           অর্ডারের সময়:{" "}
//           {orderDate ? new Date(orderDate).toLocaleString("bn-BD") : "N/A"}
//         </div>
//       </div>
//     </div>
//   );
// }




import React from "react";

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  // ডাটাবেজের ফিল্ডগুলো সেফটি চেক করে নেওয়া
  const { customer, products, subtotal, total, shipping, orderDate, _id, orderId } =
    order;
  const displayOrderId = orderId || _id?.$oid || _id?.toString() || "N/A";

  // Format date properly
  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-orange-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">অর্ডার ডিটেইলস</h2>
            <p className="text-sm text-orange-600 font-mono">#{displayOrderId}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center text-xl transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Customer & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-sm">
                  👤
                </span>
                <h4 className="text-gray-500 text-xs uppercase font-bold tracking-wider">
                  কাস্টমার তথ্য
                </h4>
              </div>
              <p className="text-gray-900 font-semibold text-lg">
                {customer?.name || "N/A"}
              </p>
              <p className="text-gray-600 mt-1">📞 {customer?.phone || "N/A"}</p>
              <p className="text-gray-500 text-sm mt-1 break-words leading-relaxed">
                📍 {customer?.address || "N/A"}
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm">
                  💳
                </span>
                <h4 className="text-gray-500 text-xs uppercase font-bold tracking-wider">
                  পেমেন্ট ও নোট
                </h4>
              </div>
              <p className="text-gray-900 font-semibold">
                {customer?.paymentMethod || "ক্যাশ অন ডেলিভারি"}
              </p>
              {customer?.note && (
                <p className="text-gray-500 text-sm italic mt-2 flex items-start gap-1">
                  <span>💬</span>
                  <span>নোট: {customer.note}</span>
                </p>
              )}
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center text-sm">
                  📦
                </span>
                <h4 className="text-gray-500 text-xs uppercase font-bold tracking-wider">
                  পণ্যসমূহ
                </h4>
              </div>
              <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                {products?.length || 0} টি
              </span>
            </div>
            <div className="space-y-3">
              {products?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border-2 border-gray-100 shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-gray-900 font-semibold group-hover:text-orange-600 transition-colors">
                      {item.name || "পণ্য"}
                    </p>
                    <div className="flex flex-wrap gap-2 text-gray-500 text-xs mt-1.5">
                      {item.weight && (
                        <span className="bg-white px-2 py-1 rounded-md">
                          ওজন: {item.weight}
                        </span>
                      )}
                      <span className="bg-white px-2 py-1 rounded-md font-bold text-gray-700">
                        পরিমাণ: {item.quantity || 1}
                      </span>
                      {item.price && (
                        <span className="bg-white px-2 py-1 rounded-md text-gray-500">
                          দাম: ৳{item.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-green-600 font-bold text-lg">
                      ৳{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </p>
                    {item.price && (
                      <p className="text-gray-400 text-xs mt-0.5">
                        ৳{item.price} × {item.quantity || 1}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
            <div className="flex justify-between items-center text-gray-600">
              <span className="flex items-center gap-2">
                <span className="text-sm">📋</span> সাবটোটাল
              </span>
              <span className="font-medium">৳{subtotal?.toLocaleString() || 0}</span>
            </div>
            {shipping > 0 && (
              <div className="flex justify-between items-center text-gray-600">
                <span className="flex items-center gap-2">
                  <span className="text-sm">🚚</span> শিপিং চার্জ
                </span>
                <span className="font-medium">৳{shipping?.toLocaleString() || 0}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t-2 border-dashed border-gray-300">
              <span className="text-gray-900 font-bold text-lg">মোট</span>
              <span className="text-green-600 font-bold text-2xl">
                ৳{total?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>🕐</span>
            <span>অর্ডারের সময়:</span>
            <span className="font-medium text-gray-700">
              {formatDate(orderDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
