'use client';

import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase.config';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductDetails from '@/components/ProductDetails';
import VideoSection from '@/components/VideoSection';
// import ReviewCarousel from '@/components/ReviewCarousel';
import HowToEat from '@/components/HowToEat';
import Packaging from '@/components/Packaging';
import WhyChooseUs from '@/components/WhyChooseUs';
import OrderSection from '@/components/OrderSection';
import SecondHero from '@/components/SecondHero';
import BestSelling from '@/components/BestSelling';
import SafetySection from '@/components/SafetySection';
import Products from '@/components/Products';
// import Checkout from '@/components/Checkout';
import Footer from '@/components/Footer';
import ContactWidget from '../components/ContactWidget';
import { ToastContainer } from 'react-toastify';
import LivePurchasePopup from '../components/LivePurchasePopup';
import FaqSection from '../components/FaqSection';

export default function Home() {
	const [showCheckout, setShowCheckout] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const navigationEntries = performance.getEntriesByType('navigation');
		const isReload = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';

		if (isReload) {
			window.scrollTo(0, 0);
			if (window.location.hash) {
				window.history.replaceState(null, '', window.location.pathname + window.location.search);
			}
		}
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				signOut(auth).catch(() => {});
			}
			localStorage.removeItem('adminAuth');
		});

		return () => unsubscribe();
	}, []);

	return (
		<main className="w-full">
			{/* Admin Link - Hidden in corner */}
			<div className="fixed bottom-4 right-4 z-40">
				<ContactWidget></ContactWidget>
			</div>

			

			<Navbar />

		<div id="home">
			<Hero onOrderClick={() => setShowCheckout(true)} />
		</div>
		<div id="details">
			<ProductDetails onOrderClick={() => setShowCheckout(true)} />
		</div>
		<div id="video">
			<VideoSection />
		</div>
		{/* <ReviewCarousel /> */}
		<div id="how">
			<HowToEat />
		</div>

		<div id="packaging">
			<Packaging onOrderClick={() => setShowCheckout(true)} />
		</div>
		<div id="why">
			<WhyChooseUs />
		</div>
		<div>
			<FaqSection />
		</div>
		{/* <div id="order">
			<OrderSection onOrderClick={() => setShowCheckout(true)} />
		</div> */}
		<div id="best-selling">
			<SecondHero onOrderClick={() => setShowCheckout(true)} />
		</div>
		<div id="best-selling">
			<BestSelling onOrderClick={() => setShowCheckout(true)} />
		</div>
		
		<div id="safety">
			<SafetySection />
		</div>
		<div id="products">
			<Products onOrderClick={() => setShowCheckout(true)} />
		</div>
		<div id="contact">
			<Footer />
		</div>
			<ToastContainer position="top-right" autoClose={3000} />
			<LivePurchasePopup />
		</main>
	);
}
