// export default function HowToEat() {
//   const ways = [
//     {
//       title: 'দীর্ঘস্থায়ী ও টেকসই',
//       emoji: '🏗️',
//       description: 'পিতল খুবই মজবুত ধাতু। সহজে ভাঙে না, মরিচা ধরে না—ফলে অনেক বছর ব্যবহার করা যায়।',
//     },
//     {
//       title: 'জীবাণুনাশক গুণ',
//       emoji: '🧼',
//       description: 'পিতলে প্রাকৃতিকভাবে অ্যান্টিব্যাকটেরিয়াল বৈশিষ্ট্য থাকে, যা খাবার বা পানির জন্য নিরাপদ করে তোলে।',
//     },
//     {
//       title: 'তাপ পরিবাহিতা ভালো',
//       emoji: '🍳',
//       description: 'রান্নার ক্ষেত্রে পিতলের পাত্র দ্রুত গরম হয় এবং তাপ সমানভাবে ছড়ায়—ফলে রান্না ভালো হয়।',
//     },
//     {
//       title: 'স্বাস্থ্যসম্মত ব্যবহার',
//       emoji: '🌿',
//       description: 'অনেকে বিশ্বাস করেন পিতলের পাত্রে পানি বা খাবার রাখলে তা শরীরের জন্য উপকারী হতে পারে।',
//     },
//     {
//       title: 'দৃষ্টিনন্দন ও ঐতিহ্যবাহী',
//       emoji: '🏺',
//       description: 'পিতলের জিনিস দেখতে আকর্ষণীয় এবং ঘরের সৌন্দর্য বাড়ায়। ডেকোরেশন হিসেবেও ব্যবহার করা যায়।',
//     },
//     {
//       title: 'পরিবেশবান্ধব',
//       emoji: '♻️',
//       description: 'পিতল পুনর্ব্যবহারযোগ্য (recyclable), তাই এটি পরিবেশের ক্ষতি খুব কম করে।',
//     },
//     {
//       title: 'রক্ষণাবেক্ষণ সহজ',
//       emoji: '✨',
//       description: 'সামান্য পরিষ্কার ও যত্ন নিলেই পিতলের জিনিস অনেকদিন নতুনের মতো থাকে।',
//     },
//     {
//       title: 'উপহার হিসেবে অতুলনীয়',
//       emoji: '🎁',
//       description: 'প্রিয়জনদের বিশেষ দিনে বা উৎসবে আভিজাত্যপূর্ণ উপহার হিসেবে পিতলের সামগ্রী একটি সেরা পছন্দ।',
//     },
//   ];

//   return (
//     <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
//           🔶 পিতলের পণ্য কেন ব্যবহার করবেন?
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {ways.map((way, index) => (
//             <div
//   key={index}
//   className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500 sticky top-20 md:static ${index > 0 ? 'max-md:mt-2.5' : ''}`}
//   style={{ zIndex: index + 1 }}
// >
//               <div className="text-4xl mb-3 text-center">{way.emoji}</div>
//               <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{way.title}</h3>
//               <p className="text-gray-600 text-sm text-center leading-relaxed">{way.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



export default function HowToEat() {
  const ways = [
    {
      title: 'তাজা ও পুষ্টিকর আম',
      emoji: '🥭',
      description: 'সরাসরি গাছপাকা আম খাওয়ার মজাই আলাদা। এতে প্রচুর পরিমাণে ভিটামিন সি এবং ফাইবার থাকে যা শরীরের জন্য উপকারী।',
    },
    {
      title: 'ঠান্ডা ম্যাঙ্গো শেক',
      emoji: '🥤',
      description: 'গরমের দুপুরে এক গ্লাস ঠান্ডা ম্যাঙ্গো শেক প্রাণ জুড়িয়ে দেয়। দুধ, চিনি আর পাকা আমের মিশ্রণে এটি তৈরি করা সহজ।',
    },
    {
      title: 'টক-মিষ্টি আমের আচার',
      emoji: '🍯',
      description: 'কাঁচা আম দিয়ে তৈরি আচার রোদে শুকিয়ে বা তেলে ভিজিয়ে সারা বছর সংরক্ষণ করা যায়, যা খাবারের স্বাদ বাড়িয়ে দেয়।',
    },
    {
      title: 'সুস্বাদু আম-সত্ত্ব',
      emoji: '🍱',
      description: 'পাকা আমের রস জ্বাল দিয়ে পাতলা করে শুকিয়ে তৈরি করা হয় আম-সত্ত্ব। এটি ছোট-বড় সবার কাছে একটি প্রিয় মুখরোচক খাবার।',
    },
    {
      title: 'স্বাস্থ্যকর ফ্রুট সালাদ',
      emoji: '🥗',
      description: 'অন্যান্য ফলের সাথে আমের টুকরো মিশিয়ে দারুণ সালাদ তৈরি করা যায়। এটি সকালের নাস্তায় বা বিকেলের স্ন্যাকস হিসেবে চমৎকার।',
    },
    {
      title: 'আমের চাটনি ও সস',
      emoji: '🥣',
      description: 'কাঁচা আমের ঝাল-মিষ্টি চাটনি ভাতের সাথে বা বিকেলের নাস্তায় ডিনারের অনুষঙ্গ হিসেবে দারুণ জনপ্রিয়।',
    },
    {
      title: 'ফ্রোজেন ম্যাঙ্গো স্লাইস',
      emoji: '❄️',
      description: 'আমের স্লাইস ডিপ ফ্রিজে রেখে আইসক্রিমের বিকল্প হিসেবে খাওয়া যায়, যা প্রাকৃতিকভাবে মিষ্টি এবং স্বাস্থ্যকর।',
    },
    {
      title: 'ঐতিহ্যবাহী আম-দুধ-ভাত',
      emoji: '🍚',
      description: 'বাঙালি ঐতিহ্যে গরম ভাতের সাথে পাকা আম এবং দুধ মাখিয়ে খাওয়ার রীতি যুগ যুগ ধরে চলে আসছে।',
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <span className="text-3xl">🥭</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            আম খাওয়ার রাজকীয় সব উপায়
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            তাজা আম থেকে শুরু করে আচার—সবই পাবেন এখানে
          </p>
        </div>

        {/* Stacking Grid - Here is the fix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {ways.map((way, index) => (
            <div
              key={index}
              className="sticky top-24 bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden group transition-all duration-300 hover:shadow-2xl"
              style={{
                // এটিই কার্ডগুলোকে একটার নিচে আরেকটা পড়ার লুক দেবে
                marginTop: index > 1 ? '20px' : '0px',
                zIndex: index
              }}
            >
              {/* Colored Top Bar */}
              <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-400"></div>
              
              <div className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500">
                    {way.emoji}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                    {way.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {way.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Footer */}
        <div className="mt-24 text-center">
          <div className="flex items-center justify-center gap-4 text-amber-400">
            <div className="h-px w-20 bg-amber-200"></div>
            <span className="animate-bounce">🥭</span>
            <div className="h-px w-20 bg-amber-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
}