'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'The Fleet', href: '/#fleet' },
        { name: 'Reviews', href: '/#testimonials' },
        { name: 'Experience', href: '/#experience' },
        { name: 'FAQ', href: '/#faq' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-adventure-bg/80 backdrop-blur-md border-b border-adventure-primary/20 py-4'
                : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-adventure-accent flex items-center justify-center font-bold text-adventure-bg text-2xl shadow-lg group-hover:bg-adventure-mist transition-colors">
                            V
                        </div>
                        <span className="text-2xl font-playfair font-black text-adventure-mist tracking-tighter uppercase drop-shadow-md">
                            VK21 <span className="text-adventure-accent">Bike Rentals</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs uppercase tracking-[0.25em] font-bold text-adventure-mist/90 hover:text-adventure-accent transition-all drop-shadow-sm"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex flex-col items-end gap-1">
                        <Link href="/booking">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: '#7DA065', color: '#1B261A' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-2.5 border-2 border-adventure-accent text-adventure-accent text-xs font-black uppercase tracking-widest transition-all shadow-lg"
                            >
                                Book Now
                            </motion.button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/2354/2354127.png" alt="Phone" className="w-3 h-3 invert opacity-70" />
                            <span className="text-[10px] text-adventure-accent font-bold tracking-[0.2em]">091454 84242</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-adventure-accent text-sm font-bold tracking-widest z-50 relative"
                >
                    {isOpen ? 'CLOSE' : 'MENU'}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-adventure-bg z-40 flex flex-col items-center justify-center gap-8 md:hidden p-6 pt-24"
                    >
                        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                            <svg className="w-full h-full text-adventure-accent" viewBox="0 0 100 100">
                                <path d="M0 50 Q 25 40 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </svg>
                        </div>

                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl font-playfair font-black text-adventure-mist uppercase tracking-[0.2em] hover:text-adventure-accent transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}

                        <div className="mt-8 flex flex-col items-center gap-4">
                            <Link href="/booking">
                                <button className="px-12 py-4 border-2 border-adventure-accent text-adventure-accent text-lg font-black uppercase tracking-widest">
                                    Book Now
                                </button>
                            </Link>
                            <span className="text-adventure-accent font-bold tracking-widest">091454 84242</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
