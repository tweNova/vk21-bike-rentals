'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
    {
        question: "What documents do I need to rent a bike?",
        answer: "You will need a valid Driving License, Aadhar Card, and a copy of your flight/train ticket if you are a tourist. We keep the original Aadhar Card as a security deposit during the rental period."
    },
    {
        question: "Is there a security deposit?",
        answer: "Yes, a refundable security deposit ranging from Rs. 2,000 to Rs. 5,000 is required depending on the bike model. This is fully refunded upon the safe return of the vehicle."
    },
    {
        question: "Are helmets provided?",
        answer: "Yes, we provide one ISI-marked helmet for free with every rental. A second helmet for the pillion is available for a small additional charge."
    },
    {
        question: "What is the fuel policy?",
        answer: "We provide bikes with enough fuel to reach the nearest petrol pump. We expect the bike to be returned with a similar amount of fuel."
    },
    {
        question: "Do you provide roadside assistance?",
        answer: "Yes, we provide 24/7 roadside assistance within a 50km radius of Goa. For longer trips, we provide basic toolkits and spare parts."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-32 px-4 md:px-8 bg-adventure-bg relative overflow-hidden">
            <div className="max-w-4xl mx-auto border-t border-white/5 pt-24">
                <div className="text-center mb-16">
                    <span className="text-adventure-accent font-bold uppercase tracking-[0.5em] text-xs mb-4 block">Common Queries</span>
                    <h2 className="text-5xl md:text-7xl font-playfair font-bold text-adventure-mist uppercase">Rider's Guide</h2>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="border border-white/5 bg-adventure-primary/5">
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left group transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/5726/5726678.png" alt="" className={`w-5 h-5 transition-all ${activeIndex === index ? '' : 'invert opacity-50'}`} />
                                    <span className={`text-lg font-playfair font-bold tracking-wide transition-colors ${activeIndex === index ? 'text-adventure-accent' : 'text-adventure-mist group-hover:text-adventure-accent/70'}`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <motion.span
                                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                                    className="text-adventure-accent text-2xl"
                                >
                                    +
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-8 text-adventure-sage font-inter italic leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Text */}
            <div className="absolute -bottom-20 -left-20 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none uppercase">
                FAQ
            </div>
        </section>
    );
}
