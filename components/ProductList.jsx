// "use client";

// import { useState } from "react";

// export default function ProductList({ allProducts, selectedProducts, toggleProduct }) {
//   return (
//     <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//       {allProducts.map((p) => {
//         const isSelected = selectedProducts.find((item) => item._id === p._id);
//         return (
//           <div
//             key={p._id}
//             className={`flex items-center gap-4 bg-green-100 rounded-lg p-3 border-2 transition-all cursor-pointer ${
//               isSelected ? "border-green-500 " : "border-gray-200"
//             }`}
//             onClick={() => toggleProduct(p)}
//           >
//             <input
//               type="checkbox"
//               checked={!!isSelected}
//               onChange={() => {}}
//               className="w-5 h-5 accent-green-600"
//             />
//             <img src={p.image} className="w-16 h-16 object-cover rounded" alt={p.name} />
//             <div className="flex-1">
//               <h4 className="font-bold text-lg">{p.name}</h4>
//               <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{p.description}</p>
//               <p className="font-bold text-green-700 mt-1">৳{p.price}</p>
//             </div>
//           </div>
//         );
//       })}
//     </section>
//   );
// }


"use client";

import { useState } from "react";

export default function ProductList({ allProducts, selectedProducts, toggleProduct }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-1"></div>
          <div className="col-span-4">Product</div>
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-right">Price</div>
        </div>
      </div>

      {/* Product Rows */}
      <div className="divide-y divide-gray-100">
        {allProducts.map((p) => {
          const isSelected = selectedProducts.find((item) => item._id === p._id);
          return (
            <div
              key={p._id}
              className={`group grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors cursor-pointer ${
                isSelected 
                  ? "bg-emerald-50/50 hover:bg-emerald-50" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => toggleProduct(p)}
            >
              {/* Checkbox */}
              <div className="col-span-1">
                <div className="relative inline-flex">
                  <input
                    type="checkbox"
                    checked={!!isSelected}
                    onChange={() => {}}
                    className={`w-4 h-4 rounded border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-emerald-500 border-emerald-500" 
                        : "border-gray-300 hover:border-emerald-400"
                    }`}
                  />
                </div>
              </div>

              {/* Product Image & Name */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={p.image} 
                    className="w-full h-full object-cover" 
                    alt={p.name}
                  />
                </div>
                <span className="font-medium text-gray-900 text-sm">
                  {p.name}
                </span>
              </div>

              {/* Description */}
              <div className="col-span-5">
                <p className="text-sm text-gray-500 line-clamp-1">
                  {p.description}
                </p>
              </div>

              {/* Price */}
              <div className="col-span-2 text-right">
                <span className={`font-semibold text-sm ${
                  isSelected ? "text-emerald-600" : "text-gray-900"
                }`}>
                  ৳{p.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}