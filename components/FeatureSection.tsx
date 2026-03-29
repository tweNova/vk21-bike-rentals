'use client';

import { motion } from 'framer-motion';
import { tourFeatures } from '@/data/products';

export default function FeatureSection() {
    return (
        <section className="py-20 md:py-32 bg-adventure-bg/50 border-y border-adventure-primary/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                    {tourFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="text-center group"
                        >
                            <div className="w-20 h-20 bg-adventure-primary/20 flex items-center justify-center mx-auto mb-8 border border-adventure-accent/30 rotate-45 group-hover:rotate-0 transition-all duration-500">
                                <img
                                    src={feature.icon}
                                    alt=""
                                    className="w-10 h-10 object-contain rotate-[-45deg] group-hover:rotate-0 transition-all duration-500 invert opacity-80 group-hover:opacity-100"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-adventure-mist mb-4 uppercase drop-shadow-md">
                                {feature.title}
                            </h3>
                            <p className="text-adventure-sage text-sm md:text-base max-w-[280px] mx-auto italic">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
