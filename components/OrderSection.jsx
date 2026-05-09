"use client";
import { contact } from "../lib/fpixel";

export default function OrderSection({ onOrderClick }) {
  const handleOrderRedirect = () => {
    contact("Order_Section_CTA");
  };

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            📦 অর্ডার করুন এখনই!
          </h2>

          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6 text-center">
              <p className="text-gray-900 font-bold mb-4 text-lg">
                👉 অর্ডার করতে নিচে ক্লিক করুন
              </p>
              <a
                href="#products"
                onClick={handleOrderRedirect}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
              >
                অর্ডার করুন
              </a>
            </div>

            {/* Delivery & Payment sections ... (unchanged) */}

            {/* Contact */}
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">📱</span>
                সরাসরি যোগাযোগ করুন
              </h3>
              <p className="text-gray-700">কোনো প্রশ্ন থাকলে সরাসরি কল করুন:</p>
              <a
                href="tel:01616123500"
                onClick={() => contact("Phone_Call_Initiated")}
                className="text-green-600 font-bold text-lg mt-2 inline-block cursor-pointer hover:underline"
              >
                📞 01616123500
              </a>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="#products"
              onClick={handleOrderRedirect}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              এখনই অর্ডার করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
