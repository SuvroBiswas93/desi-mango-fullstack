import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
import { AuthProvider } from "@/lib/firebase/AuthContext";
import TanstackProvider from "../components/providers/TanstackProvider";
import MetaPixel from "../components/MetaPixel/MetaPixel";

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "দেশি আম -শতভাগ হালাল",
  description:
    "শতভাগ হালাল দেশি আম সরাসরি আপনার দোরগোড়ায়। তাজা উপাদানে তৈরি বিভিন্ন ধরনের আচার কিনুন অনলাইনে।",
  keywords:
    "দেশি আম, হালাল , বাংলাদেশি দেশি আম, অনলাইন দেশি আম কেনা, তাজা দেশি আম",
  openGraph: {
    title: "দেশি আম ",
    description: "শতভাগ হালাল দেশি আম সরাসরি আপনার দোরগোড়ায়।",
    url: "https://yourwebsite.com",
    siteName: "দেশি আম",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "দেশি আম ",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "দেশি আম",
    description: "শতভাগ হালাল দেশি আম সরাসরি আপনার দোরগোড়ায়।",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "দেশি আম",
              url: "https://yourwebsite.com",
              logo: "https://yourwebsite.com/logo.png",
              description: "শতভাগ হালাল দেশি আম",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+880-123-456789",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body
        className="font-sans antialiased bg-gradient-to-b from-green-50 to-white"
        suppressHydrationWarning={true}
      >
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <AuthProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </AuthProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
        <Toaster position="top-right" reverseOrder={false} />
        <ScrollToTop />
      </body>
    </html>
  );
}
