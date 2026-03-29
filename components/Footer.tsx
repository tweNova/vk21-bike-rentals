'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-adventure-bg border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-adventure-accent flex items-center justify-center font-bold text-adventure-bg text-xl shadow-lg">
                        V
                    </div>
                    <span className="text-xl font-playfair font-black text-adventure-mist tracking-tighter uppercase">
                        VK21 <span className="text-adventure-accent">Bike Rentals</span>
                    </span>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-adventure-sage/60 text-xs uppercase tracking-[0.3em] font-bold mb-2">
                        © {new Date().getFullYear()} VK21 Bike Rentals. All rights reserved.
                    </p>
                    <p className="text-adventure-sage text-[10px] uppercase tracking-[0.2em] font-medium">
                        Developed and Managed by{' '}
                        <a
                            href="https://twenova.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-adventure-accent hover:text-adventure-mist transition-colors font-bold underline underline-offset-4"
                        >
                            twenova.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
