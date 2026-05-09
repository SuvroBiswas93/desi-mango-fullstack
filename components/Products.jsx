
"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { viewContent, addToCart } from "../lib/fpixel";
import { orderSchema } from "../lib/schemas";
import ProductList from "./ProductList";
import OrderSummary from "./OrderSummary";
import BillingForm from "./BillingForm";

export default function CheckoutPage() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shippingLocation, setShippingLocation] = useState("inside");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetch("/api/products/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllProducts(data.data);
          viewContent({
            name: "Main Product List",
            id: "main_product_list",
            price: 0,
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleProduct = (product) => {
    const exists = selectedProducts.find((p) => p._id === product._id);
    if (exists) {
      setSelectedProducts(
        selectedProducts.filter((p) => p._id !== product._id),
      );
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
      });
    }
  };

  const updateQuantity = (id, delta) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p._id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p,
      ),
    );
  };

  const subtotal = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );
  const shipping = shippingLocation === "inside" ? 60 : 100;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProducts.length === 0) return toast.error("পণ্য সিলেক্ট করুন");

    const orderData = {
      customer: formData,
      products: selectedProducts,
      total,
      shipping,
      shippingLocation,
    };

    const validation = orderSchema.safeParse(orderData);
    if (!validation.success) {
      return toast.error("ভ্যালিডেশন এরর: " + validation.error.errors.map(e => e.message).join(", "));
    }

    setIsSubmitting(true);

    const res = await fetch("/api/orders/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("অর্ডার সফল হয়েছে!");
      const params = new URLSearchParams({
        orderId: result.id,
        token: result.orderAccessToken,
      });
      router.push(`/order-success?${params.toString()}`);
    } else {
      toast.error("সমস্যা: " + result.message);
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center py-20 font-bold">লোড হচ্ছে...</div>;

  return (
    <div className="bg-gray-50 min-h-screen" id="products">
      <Toaster position="top-right" />

      {/* --- Scrolling News Ticker Section --- */}
      <div className="w-full bg-orange-600 text-white overflow-hidden py-3 border-b border-orange-700">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-lg md:text-xl font-bold px-4">
            🥭 সরাসরি রাজশাহীর বাগান থেকে বাছাইকৃত ১০০% বিষমুক্ত আম 
          </span>
          <span className="text-lg md:text-xl font-bold px-4">
            🚀 সারাদেশে দ্রুততম সময়ে ক্যাশ অন ডেলিভারি দেওয়া হয় 
          </span>
          <span className="text-lg md:text-xl font-bold px-4">
            📦 প্রতিটি পার্সেল নিরাপদ প্যাকেজিং নিশ্চিত করা হয় 
          </span>
          {/* Duplicate for seamless looping */}
          <span className="text-lg md:text-xl font-bold px-4">
            🥭 সরাসরি রাজশাহীর বাগান থেকে বাছাইকৃত ১০০% বিষমুক্ত আম 
          </span>
          <span className="text-lg md:text-xl font-bold px-4">
            🚀 সারাদেশে দ্রুততম সময়ে ক্যাশ অন ডেলিভারি দেওয়া হয় 
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-900 text-white text-center py-8 px-4">
        <h2 className="text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed opacity-90">
          আমাদের প্রতিটি আম অত্যন্ত যত্নের সাথে গাছ থেকে পেড়ে প্রাকৃতিকভাবে পাকানো হয়। 
          আমরা কোনো প্রকার ক্ষতিকারক কেমিক্যাল বা ফরমালিন ব্যবহার করি না।
        </h2>
      </div>

      <div className="p-4 py-12 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">আপনার পছন্দের আম বেছে নিন</h1>
          <p className="text-slate-500 text-lg">নিচের তালিকা থেকে আপনার প্রিয় জাতটি সিলেক্ট করে অর্ডার করুন</p>
          <div className="h-1.5 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <ProductList allProducts={allProducts} selectedProducts={selectedProducts} toggleProduct={toggleProduct} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          <OrderSummary
            selectedProducts={selectedProducts}
            toggleProduct={toggleProduct}
            updateQuantity={updateQuantity}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />

          <BillingForm
            formData={formData}
            setFormData={setFormData}
            shippingLocation={shippingLocation}
            setShippingLocation={setShippingLocation}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* --- Inline CSS for Marquee Animation --- */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}