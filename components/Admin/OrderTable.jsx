// import { Trash2 } from "lucide-react";

// export default function OrderTable({
//   data,
//   onView,
//   onUpdateStatus,
//   onSendToCourier,
//   onCheckCourierStatus,
//   onDelete,
//   activeTab,
//   courierLoadingId,
// }) {
//   return (
//     <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
//       {/* Container to prevent table breaking on mobile */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left min-w-[500px]">
//           <thead className="bg-slate-800/50">
//             <tr>
//               <th className="p-3 md:p-5 text-slate-300 font-semibold text-sm md:text-base">Customer Name</th>
//               <th className="p-3 md:p-5 text-slate-300 font-semibold text-sm md:text-base">Status</th>
//               <th className="p-3 md:p-5 text-slate-300 font-semibold text-sm md:text-base">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-800">
//             {data.length > 0 ? (
//               data.map((item, index) => {
//                 const orderId =
//                   typeof item._id === "object"
//                     ? item._id?.$oid || item._id?.toString?.()
//                     : item._id;
//                 const isCourierLoading = courierLoadingId === orderId;
//                 const isSentToCourier = Boolean(item.courier?.sentAt || item.courier?.consignmentId);

//                 return (
//                 <tr key={orderId} className="hover:bg-slate-800/30 transition-colors">
//                    <td className="p-3 md:p-5 text-sm md:text-base">
//                      {index + 1}. {item.customer?.name}
//                       </td>
//                   <td className="p-3 md:p-5">
//                     <div className="flex flex-col items-start gap-1">
//                       <span className="px-2 py-1 bg-slate-800 rounded text-[10px] md:text-xs capitalize">{item.status}</span>
//                       {item.courier?.deliveryStatus && (
//                         <span className="px-2 py-1 bg-amber-600/10 text-amber-400 rounded text-[10px] md:text-xs capitalize">
//                           Courier: {item.courier.deliveryStatus.replaceAll("_", " ")}
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="p-3 md:p-5 flex items-center gap-3 md:gap-4">
//                     <button onClick={() => onView(item)} className="text-blue-400 cursor-pointer hover:underline text-xs md:text-sm">View</button>
                    
//                     {activeTab === "pending" && (
//                       <button onClick={() => onUpdateStatus(orderId, "confirmed")} className="bg-green-600/20 text-green-400 cursor-pointer px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs hover:bg-green-600 hover:text-white transition-all whitespace-nowrap">Confirm</button>
//                     )}
//                     {activeTab === "confirmed" && (
//                       <>
//                         <button onClick={() => onUpdateStatus(orderId, "delivered")} className="bg-purple-600/20 text-purple-400 cursor-pointer px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs hover:bg-purple-600 hover:text-white transition-all whitespace-nowrap">Delivery</button>
//                         <button
//                           onClick={() => onSendToCourier(orderId)}
//                           disabled={isCourierLoading || isSentToCourier}
//                           className="bg-amber-600/20 text-amber-400 cursor-pointer px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs hover:bg-amber-600 hover:text-white transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           {isCourierLoading ? "Sending..." : isSentToCourier ? "Sent to Courier" : "Send to Courier"}
//                         </button>
//                       </>
//                     )}

//                     {activeTab === "delivered" && (
//                       <>
//                         {isSentToCourier && (
//                           <button
//                             onClick={() => onCheckCourierStatus(orderId)}
//                             disabled={isCourierLoading}
//                             className="bg-amber-600/20 text-amber-400 cursor-pointer px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs hover:bg-amber-600 hover:text-white transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             {isCourierLoading ? "Checking..." : "Check Status"}
//                           </button>
//                         )}
//                         <button 
//                           onClick={() => onDelete(orderId)} 
//                           className="text-red-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
//                           title="Delete Order"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })
//             ) : (
//               <tr><td colSpan="3" className="p-10 text-center text-slate-500">No orders found</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { Trash2, Eye, CheckCircle, Truck, Package, Send, RefreshCw, Clock, User, Phone, DollarSign } from "lucide-react";

export default function OrderTable({
  data,
  onView,
  onUpdateStatus,
  onSendToCourier,
  onCheckCourierStatus,
  onDelete,
  activeTab,
  courierLoadingId,
}) {
  
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-100 ring-1 ring-amber-200/50",
      confirmed: "bg-blue-50 text-blue-700 border-blue-100 ring-1 ring-blue-200/50",
      delivered: "bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-emerald-200/50",
      shipped: "bg-purple-50 text-purple-700 border-purple-100 ring-1 ring-purple-200/50",
    };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${styles[status] || styles.pending}`}>
        <span className={`w-1.5 h-1.5 rounded-full fill-current ${status === 'delivered' ? 'bg-emerald-500' : 'bg-current'}`} />
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200/60">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Order Details</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Customer Info</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Courier Link</th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((item) => {
                const orderId = typeof item._id === "object" ? item._id?.$oid || item._id?.toString() : item._id;
                const isCourierLoading = courierLoadingId === orderId;
                const isSentToCourier = Boolean(item.courier?.sentAt || item.courier?.consignmentId);

                return (
                  <tr key={orderId} className="hover:bg-slate-50/80 transition-all duration-200 group">
                    {/* Order ID & Items */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 leading-none mb-1">
                          #{orderId?.slice(-8).toUpperCase()}
                        </span>
                        <div className="flex items-center text-[12px] text-slate-500">
                          <Package className="w-3 h-3 mr-1" />
                          {item.items?.length || 0} Products
                        </div>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-white transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800 tracking-tight">
                            {item.customer?.name || 'Unknown Guest'}
                          </span>
                          <span className="text-[12px] text-slate-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1 opacity-70" /> {item.customer?.phone || 'No phone'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 italic">
                          ৳{item.total?.toLocaleString() || 0}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Paid via COD</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Courier Status */}
                    <td className="px-6 py-4">
                      {item.courier?.deliveryStatus ? (
                        <div className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-medium border border-slate-200 shadow-sm">
                          <Truck className="w-3 h-3 mr-1.5 text-blue-500" />
                          {item.courier.deliveryStatus.replaceAll("_", " ")}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Not Assigned</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onView(item)}
                          className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

                        {activeTab === "pending" && (
                          <button
                            onClick={() => onUpdateStatus(orderId, "confirmed")}
                            className="h-8 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold rounded-lg transition-all shadow-sm hover:shadow-indigo-200"
                          >
                            Confirm Order
                          </button>
                        )}

                        {activeTab === "confirmed" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => onSendToCourier(orderId)}
                              disabled={isCourierLoading || isSentToCourier}
                              className={`h-8 px-4 flex items-center gap-1.5 text-[12px] font-bold rounded-lg transition-all border ${
                                isSentToCourier 
                                ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed" 
                                : "bg-white text-amber-600 border-amber-200 hover:bg-amber-50 shadow-sm"
                              }`}
                            >
                              <Send className="w-3 h-3" />
                              {isCourierLoading ? "Sending..." : isSentToCourier ? "Courier Sent" : "Send to Courier"}
                            </button>
                            
                            <button
                              onClick={() => onUpdateStatus(orderId, "delivered")}
                              className="h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold rounded-lg transition-all shadow-sm hover:shadow-emerald-200"
                            >
                              Deliver
                            </button>
                          </div>
                        )}

                        {activeTab === "delivered" && (
                          <>
                            {isSentToCourier && (
                              <button
                                onClick={() => onCheckCourierStatus(orderId)}
                                disabled={isCourierLoading}
                                className="h-8 w-8 flex items-center justify-center text-amber-600 hover:bg-amber-50 border border-amber-100 rounded-lg transition-all disabled:opacity-50"
                                title="Sync Status"
                              >
                                <RefreshCw className={`w-3.5 h-3.5 ${isCourierLoading ? "animate-spin" : ""}`} />
                              </button>
                            )}
                            <button
                              onClick={() => onDelete(orderId)}
                              className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-24">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                       <Package className="w-8 h-8 text-slate-200" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-lg">No orders found</h3>
                    <p className="text-slate-500 text-sm max-w-[200px] text-center">We couldn't find any orders for the selected filter.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Footer Summary */}
      {data.length > 0 && (
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <span className="text-[12px] text-slate-500 font-medium">
               Showing <span className="text-slate-900 font-bold">{data.length}</span> results
             </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Grand Total</span>
              <span className="text-lg font-black text-slate-900 leading-none">
                ৳{data.reduce((sum, item) => sum + (item.total || 0), 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}