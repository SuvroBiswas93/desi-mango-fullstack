"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "আম অর্ডার করার পর কত দিনের মধ্যে ডেলিভারি পাব?",
      answer: "আমরা অর্ডার কনফার্মেশনের ২৪-৪৮ ঘণ্টার মধ্যে আপনার ঠিকানায় পণ্য পৌঁছে দেই। ঢাকার ভিতরে ২৪ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ৪৮ ঘণ্টার মধ্যে ডেলিভারি নিশ্চিত করা হয়।"
    },
    {
      question: "আম কি গাছপাকা? ফরমালিন মুক্ত কিনা?",
      answer: "হ্যাঁ, ১০০% গাছপাকা ও ফরমালিন মুক্ত আম আমরা সরবরাহ করে থাকি। আমাদের আম রাজশাহীর বাগান থেকে সরাসরি সংগ্রহ করা হয় এবং কোনো প্রকার কেমিক্যাল ব্যবহার করা হয় না।"
    },
    {
      question: "কিভাবে অর্ডার করব? অনলাইন পেমেন্ট সাপোর্ট করে?",
      answer: "আমাদের ওয়েবসাইটে পণ্য সিলেক্ট করে সহজেই অর্ডার করতে পারেন। আমরা বিকাশ, নগদ, রকেট ও ব্যাংক কার্ডের মাধ্যমে অনলাইন পেমেন্ট সাপোর্ট করি। এছাড়াও ক্যাশ অন ডেলিভারি সুবিধাও রয়েছে।"
    },
    {
      question: "আম ফ্রেশ না পেলে কি রিফান্ড পাব?",
      answer: "আমরা ১০০% গ্যারান্টি দেই ফ্রেশ ও কোয়ালিটি আম সরবরাহের। কোনো কারণে আপনি সন্তুষ্ট না হলে অথবা পচা/নষ্ট আম পেলে ২৪ ঘণ্টার মধ্যে অভিযোগ করলে সম্পূর্ণ টাকা রিফান্ড করে দেওয়া হবে।"
    },
    {
      question: "পাইকারি মূল্যে আম কিনতে চাই, কি করব?",
      answer: "পাইকারি ক্রয়ের জন্য আপনি সরাসরি আমাদের হটলাইনে যোগাযোগ করতে পারেন: ০১৯XX-XXXXXX অথবা ইমেইল করুন: wholesale@mangobd.com। আমরা পাইকারি ক্রেতাদের জন্য বিশেষ ডিসকাউন্ট অফার করে থাকি।"
    }
  ];

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <span>❓</span>
            <span>সাহায্য সহায়তা</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            আপনার জিজ্ঞাসা
          </h2>
          <p className="text-lg text-gray-600">
            আমাদের সম্পর্কে আপনার মনে যেকোনো প্রশ্নের উত্তর নিচে দেওয়া আছে
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-orange-50/30 transition-colors rounded-2xl"
              >
                <div className="flex items-start gap-3 pr-4">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-xs font-bold">?</span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                </div>
                <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Answer Panel */}
              {openIndex === index && (
                <div className="px-6 pb-5 pt-0 border-t border-gray-50">
                  <div className="flex gap-3">
                    <div className="w-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                      
                      {/* Special box for wholesale question */}
                      {index === 4 && (
                        <div className="mt-4 p-3 bg-orange-50 rounded-lg inline-block">
                          <p className="text-sm text-orange-800">
                            📞 হটলাইন: ০১৯XX-XXXXXX (১০am-৮pm)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              এখনও প্রশ্ন আছে?
            </h3>
            <p className="text-gray-600 mb-4">
              আমাদের সাপোর্ট টিম আপনাকে সাহায্য করতে প্রস্তুত
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors"
              >
                📞 কল করুন
              </a>
              <a 
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 transition-colors"
              >
                ✉️ ইমেইল করুন
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}