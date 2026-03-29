'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { motorbikeRentals } from '@/data/products';

const CATEGORIES = ['All', 'Royal Enfield', 'Commuter', 'Scooter', 'Adventure'];

export default function ProductShowcase() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBikes = motorbikeRentals.filter((bike) => {
        const matchesCategory = activeCategory === 'All' || bike.category === activeCategory;
        const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bike.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-32 px-4 md:px-8 relative bg-adventure-bg min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-adventure-accent font-bold uppercase tracking-[0.5em] text-xs mb-4"
                    >
                        Our Fleet
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-playfair font-bold text-adventure-mist mb-8"
                    >
                        Signature Rides
                    </motion.h2>
                    <div className="w-24 h-[1px] bg-adventure-accent/30 mb-12" />

                    {/* Search and Filters */}
                    <div className="w-full max-w-4xl space-y-8">
                        {/* Search Bar */}
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search by model or feature..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-adventure-primary/10 border border-white/10 px-6 py-4 text-adventure-mist focus:outline-none focus:border-adventure-accent/50 transition-all font-inter italic tracking-wide pl-14"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-adventure-accent/30 group-focus-within:text-adventure-accent transition-colors">
                                <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="Search" className="w-6 h-6 invert opacity-50 group-focus-within:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border flex items-center gap-2 ${activeCategory === cat
                                        ? 'bg-adventure-accent text-adventure-bg border-adventure-accent shadow-lg shadow-adventure-accent/20'
                                        : 'bg-transparent text-adventure-mist/60 border-white/10 hover:border-adventure-accent/50 hover:text-adventure-mist'
                                        }`}
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/3839/3839020.png"
                                        alt=""
                                        className={`w-3 h-3 ${activeCategory === cat ? '' : 'invert opacity-50'}`}
                                    />
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredBikes.map((bike, index) => (
                            <motion.div
                                layout
                                key={bike.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ProductCard product={bike} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredBikes.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-adventure-sage italic font-inter text-xl">
                            No rides found matching your search. Try another path.
                        </p>
                    </div>
                )}

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-[0.03]">
                    <img src="/bikes/silhouette.png" className="w-full h-full object-contain" alt="" />
                </div>
            </div>
        </section>
    );
}
