'use client';

import { motion } from 'framer-motion';

const REVIEWS = [
    {
        name: "Rahul Sharma",
        location: "Kolkata",
        text: "The Royal Enfield Himalayan was in top condition. Perfect for my ride to North Sikkim. Highly recommended!",
        rating: 5
    },
    {
        name: "Priyanka Das",
        location: "Goa",
        text: "Best price and very friendly service. The NTORQ was perfect for my local commute.",
        rating: 5
    },
    {
        name: "Amit Patel",
        location: "Gujarat",
        text: "Clean bikes and transparent process. No hidden charges. Will book again!",
        rating: 4
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-32 px-4 md:px-8 bg-adventure-bg relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-adventure-accent font-bold uppercase tracking-[0.5em] text-xs mb-4 block">Client Stories</span>
                    <h2 className="text-5xl md:text-7xl font-playfair font-bold text-adventure-mist uppercase">Rider Reviews</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 border border-white/5 bg-adventure-primary/10 relative group"
                        >
                            <img src="https://cdn-icons-png.flaticon.com/512/25/25672.png" alt="" className="w-8 h-8 mb-6 opacity-30 group-hover:opacity-100 transition-opacity invert" />
                            <p className="text-adventure-sage italic font-inter mb-8 leading-relaxed">
                                {review.text}
                            </p>
                            <div className="flex flex-col">
                                <span className="text-adventure-mist font-bold uppercase tracking-[0.2em] text-sm">{review.name}</span>
                                <span className="text-adventure-accent/60 text-xs font-bold">{review.location}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
