'use client';

import { useEffect } from 'react';
import HeroCanvasAnimation from '@/components/HeroCanvasAnimation';
import ProductShowcase from '@/components/ProductShowcase';
import FeatureSection from '@/components/FeatureSection';
import FinalCTA from '@/components/FinalCTA';
import Navbar from '@/components/Navbar';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
    useEffect(() => {
        // Ensure smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }, []);

    return (
        <main className="bg-adventure-bg min-h-screen">
            <Navbar />

            {/* Hero: Scroll-Triggered Narrative */}
            <HeroCanvasAnimation />

            {/* Product Showcase Section */}
            <section id="fleet">
                <ProductShowcase />
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* Feature Highlights Section */}
            <section id="experience">
                <FeatureSection />
            </section>

            {/* FAQ Section */}
            <FAQ />

            {/* Final Call-to-Action */}
            <FinalCTA />

            <Footer />
        </main>
    );
}
