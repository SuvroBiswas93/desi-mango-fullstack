// "use client";

// import { addToCart, trackCustom } from "../lib/fpixel"; // পিক্সেল ফাংশন ইমপোর্ট

// export default function OrderSummary({
//   selectedProducts,
//   toggleProduct,
//   updateQuantity,
//   subtotal,
//   shipping,
//   total,
// }) {
//   // পরিমাণ পরিবর্তনের ট্র্যাকিং হ্যান্ডলার
//   const handleQuantityUpdate = (product, change) => {
//     updateQuantity(product._id, change);

//     // যদি পরিমাণ বাড়ানো হয় (+), তবে AddToCart ইভেন্ট ফায়ার হবে
//     if (change > 0) {
//       addToCart(product);
//     }
//   };

//   // পণ্য রিমুভ ট্র্যাকিং হ্যান্ডলার
//   const handleRemoveProduct = (product) => {
//     toggleProduct(product);

//     trackCustom("RemoveFromCart", {
//       content_name: product.name,
//       content_ids: [product._id],
//       value: product.price,
//       currency: "BDT",
//     });
//   };

//   return (
//     <div className="border border-gray-300 p-0">
//       <div className="p-4 border-b border-gray-300 font-bold bg-gray-50 text-gray-800">
//         অর্ডার সামারি
//       </div>

//       <div className="p-4 space-y-4">
//         {selectedProducts.map((p) => (
//           <div
//             key={p._id}
//             className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
//           >
//             <img
//               src={p.image}
//               className="w-16 h-16 object-cover rounded-md"
//               alt={p.name}
//             />

//             <div className="flex-1">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h4 className="font-bold text-lg text-gray-900">{p.name}</h4>
//                   <p className="text-xs text-gray-500 mt-0.5">
//                     {p.description}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <p className="font-bold text-lg text-gray-800">৳{p.price}</p>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveProduct(p)}
//                     className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between gap-3 mt-3">
//                 <span className="text-sm font-semibold text-gray-600">
//                   Quantity
//                 </span>
//                 <div className="flex items-center border border-gray-300 rounded overflow-hidden">
//                   <button
//                     type="button"
//                     onClick={() => handleQuantityUpdate(p, -1)}
//                     className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm cursor-pointer border-r border-gray-300 transition-all"
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-1 font-bold text-sm bg-white text-gray-900">
//                     {p.quantity}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => handleQuantityUpdate(p, 1)}
//                     className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm cursor-pointer border-l border-gray-300 transition-all"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="p-4 border-t border-gray-300 space-y-3">
//         <div className="flex justify-between text-gray-700">
//           <span className="font-bold">Subtotal</span>
//           <span className="font-bold">৳{subtotal}</span>
//         </div>

//         <div className="flex justify-between text-gray-700">
//           <span className="font-bold">Shipping</span>
//           <span className="font-bold text-green-700">৳{shipping}</span>
//         </div>

//         <div className="flex justify-between p-4 -mx-4 bg-gray-50 border-t border-gray-300">
//           <span className="font-bold text-lg text-gray-900">Total</span>
//           <span className="font-bold text-lg text-gray-900">৳{total}</span>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { addToCart, trackCustom } from "../lib/fpixel";

export default function OrderSummary({
  selectedProducts,
  toggleProduct,
  updateQuantity,
  subtotal,
  shipping,
  total,
}) {
  const handleQuantityUpdate = (product, change) => {
    updateQuantity(product._id, change);

    if (change > 0) {
      addToCart(product);
    }
  };

  const handleRemoveProduct = (product) => {
    toggleProduct(product);

    trackCustom("RemoveFromCart", {
      content_name: product.name,
      content_ids: [product._id],
      value: product.price,
      currency: "BDT",
    });
  };

  return (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-fit max-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
          </svg>
          Order Summary
        </h2>
        <p className="text-sm text-gray-500 mt-1">{selectedProducts.length} item(s) in your cart</p>
      </div>

      {/* Cart Items */}
      <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
  {selectedProducts.length === 0 ? (
    /* flex এবং justify-center যোগ করা হয়েছে সবকিছু মাঝে আনার জন্য */
    <div className="min-h-[300px] flex flex-col items-center justify-center py-8 text-center">
      <div className="text-gray-400 text-5xl mb-4 animate-bounce">
        🛒
      </div>
      <p className="text-gray-500 font-bold text-lg">আপনার কার্ট খালি</p>
      <p className="text-sm text-gray-400 mt-2 max-w-[200px]">
        শুরু করতে আপনার পছন্দের কিছু পণ্য যোগ করুন
      </p>
    </div>
        ) : (
          selectedProducts.map((p) => (
            <div key={p._id} className="p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={p.image}
                      className="w-full h-full object-cover"
                      alt={p.name}
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-base truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {p.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-bold text-gray-900 text-base">
                        ৳{p.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(p)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Quantity
                      </span>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => handleQuantityUpdate(p, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                          disabled={p.quantity <= 1}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-gray-900">
                          {p.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityUpdate(p, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Item total</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        ৳{p.price * p.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pricing Summary */}
      {selectedProducts.length > 0 && (
        <div className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
          <div className="p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">৳{subtotal}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-emerald-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                ৳{shipping}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-emerald-600">৳{total}</span>
                  <p className="text-xs text-gray-500 mt-0.5">Including VAT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="p-5 pt-0">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
              <span>Proceed to Checkout</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}