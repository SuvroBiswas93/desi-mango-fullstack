

"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCartStore } from "../app/store/cardStore";
import { addToCart, viewContent } from "../lib/fpixel";

// Swiper styles
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Icons (you can replace with your preferred icon library)
const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

export default function BestSelling({ onOrderClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const addItem = useCartStore((state) => state.addItem);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addItem(product);
    viewContent({
      id: product._id,
      name: product.name,
      price: product.price,
    });
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
    });
    
    toast.success(`${product.name} কার্টে যোগ করা হয়েছে!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleOrderClick = (product) => {
    handleAddToCart(product, new Event('click'));
    
    setTimeout(() => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/get");
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "API Error: " + res.status);
        }

        if (result.success && result.data) {
          setProducts(result.data.slice(0, 8)); // Limit to 8 products for performance
        } else {
          setError(result.error || "প্রোডাক্ট ডাটা পাওয়া যায়নি");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "প্রোডাক্ট লোড করতে সমস্যা হয়েছে। পরে চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
              <div className="mt-4 text-gray-600 font-medium">লোড হচ্ছে...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-red-600 text-5xl mb-4">!</div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">সতর্কতা</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block py-2">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider ">
              নির্বাচিত পণ্য
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4">
            আমাদের <span className="text-orange-600">বেস্ট সেলিং</span> পণ্যসমূহ
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            গ্রাহকদের সবচেয়ে পছন্দের পণ্য, বিশেষ মূল্যে সীমিত সময়ের জন্য
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="best-selling-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div 
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col"
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      বেস্ট সেলার
                    </span>
                  </div>
                  
                  {/* Discount Badge (Optional) */}
                  {product.discount && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative pt-[75%] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority={false}
                    />
                    
                    {/* Quick View Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <button
                        onClick={() => handleOrderClick(product)}
                        className="bg-orange-400 text-gray-900 px-6 py-2 rounded-full font-semibold transform -translate-y-2 hover:bg-green-600 hover:text-white transition-all duration-300"
                      >
                        দ্রুত অর্ডার করুন
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">(128)</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 min-h-[50px]">
                      {product.name}
                    </h3>
                    
                    {/* Weight/Size */}
                    <p className="text-gray-500 text-sm mb-3">
                      {product.weight || "স্ট্যান্ডার্ড সাইজ"}
                    </p>

                    {/* Price and Action */}
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-orange-600">
                          ৳{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ৳{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleOrderClick(product)}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-800 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
                      >
                        অর্ডার করুন
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-6 z-20 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>
          
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-6 z-20 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Custom Styles for Swiper */}
      <style jsx global>{`
        .best-selling-swiper {
          padding: 0.5rem 2rem !important;
        }
        
        .best-selling-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 2rem !important;
        }
        
        .best-selling-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .best-selling-swiper .swiper-pagination-bullet-active {
          width: 24px;
          background: #16a34a;
          border-radius: 4px;
        }
        
        @media (max-width: 768px) {
          .best-selling-swiper {
            padding: 0.5rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}