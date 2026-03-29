'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MotorbikeRental } from '@/data/products';

interface ProductCardProps {
    product: MotorbikeRental;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-adventure-primary/10 border border-white/5 p-6 hover:border-adventure-accent/30 transition-all duration-500 overflow-hidden"
        >
            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 bg-adventure-accent text-adventure-bg">
                    {product.category}
                </span>
            </div>

            {/* Bike Image */}
            <div className="relative h-48 mb-8 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                />
            </div>

            {/* Content */}
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-playfair font-bold text-adventure-mist leading-tight group-hover:text-adventure-accent transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-adventure-accent">
                        <span className="text-sm font-bold">{product.rating}</span>
                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Star" className="w-3 h-3" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {product.specs.map((spec) => (
                        <span key={spec} className="text-[10px] uppercase tracking-wider text-adventure-sage/60 border border-adventure-sage/20 px-2 py-0.5">
                            {spec}
                        </span>
                    ))}
                </div>

                <p className="text-sm text-adventure-sage/80 line-clamp-2 italic font-inter">
                    {product.description}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                    <span className="text-adventure-accent font-black tracking-widest leading-none">
                        {product.price}
                    </span>
                    <Link href={`/booking?bike=${product.id}`}>
                        <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-adventure-mist hover:text-adventure-accent transition-colors">
                            Book Now +
                        </button>
                    </Link>
                </div>
            </div>

            {/* Hover Background Decor */}
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-adventure-accent/5 rounded-full blur-3xl group-hover:bg-adventure-accent/10 transition-colors duration-700" />
        </motion.div>
    );
}
