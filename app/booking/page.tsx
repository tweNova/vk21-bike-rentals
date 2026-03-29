'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motorbikeRentals } from '@/data/products';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Mock availability data: Disable some dates
const UNAVAILABLE_DATES = [
    new Date(2026, 1, 25).toDateString(),
    new Date(2026, 1, 26).toDateString(),
    new Date(2026, 2, 5).toDateString(),
    new Date(2026, 2, 6).toDateString(),
    new Date(2026, 2, 12).toDateString(),
];

function BookingContent() {
    const searchParams = useSearchParams();
    const bikeId = searchParams.get('bike');
    const [selectedBike, setSelectedBike] = useState(bikeId || motorbikeRentals[0].id);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // Start at Feb 2026 for demo
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const bike = motorbikeRentals.find(b => b.id === selectedBike) || motorbikeRentals[0];

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderCalendar = () => {
        const days = [];
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const totalDays = daysInMonth(year, month);
        const firstDay = firstDayOfMonth(year, month);

        // Header
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // Blank spaces for first week
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-12 w-full"></div>);
        }

        for (let d = 1; d <= totalDays; d++) {
            const date = new Date(year, month, d);
            const dateStr = date.toDateString();
            const isUnavailable = UNAVAILABLE_DATES.includes(dateStr);
            const isSelected = selectedDate?.toDateString() === dateStr;

            days.push(
                <button
                    key={d}
                    disabled={isUnavailable}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                        "h-12 w-full flex items-center justify-center text-sm font-bold transition-all border border-white/5",
                        isUnavailable ? "bg-white/5 text-white/10 cursor-not-allowed italic" : "hover:bg-adventure-accent/20 text-adventure-mist",
                        isSelected && "bg-adventure-accent text-adventure-bg border-adventure-accent scale-110 z-10 shadow-lg"
                    )}
                >
                    {d}
                </button>
            );
        }

        return days;
    };

    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));

    if (bookingSuccess) {
        return (
            <div className="min-h-screen bg-adventure-bg flex items-center justify-center p-6 pt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-adventure-primary/20 border border-adventure-accent/30 p-12 text-center"
                >
                    <div className="w-20 h-20 bg-adventure-accent flex items-center justify-center mx-auto mb-8 rounded-full">
                        <svg className="w-10 h-10 text-adventure-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-adventure-mist mb-4 uppercase tracking-tighter">Booking Confirmed!</h2>
                    <p className="text-adventure-sage mb-8 italic">Your adventure on the <span className="text-adventure-accent font-bold">{bike.name}</span> starts soon. We'll contact you shortly.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full py-4 bg-adventure-accent text-adventure-bg font-black uppercase tracking-widest hover:bg-adventure-mist transition-all shadow-xl"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-adventure-bg pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <span className="text-adventure-accent font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Secure Your Ride</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-adventure-mist uppercase tracking-tighter">Reservations</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Bike Selection & Details */}
                    <div className="space-y-8">
                        <div className="bg-adventure-primary/10 border border-white/5 p-8">
                            <label className="block text-adventure-accent text-xs font-black uppercase tracking-widest mb-4">Select Your Beast</label>
                            <select
                                value={selectedBike}
                                onChange={(e) => setSelectedBike(e.target.value)}
                                className="w-full bg-adventure-bg border border-white/10 p-4 text-adventure-mist focus:border-adventure-accent outline-none font-bold uppercase tracking-widest appearance-none cursor-pointer"
                            >
                                {motorbikeRentals.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-adventure-primary/10 border border-white/5 p-8 relative overflow-hidden group">
                            <img src={bike.image} alt={bike.name} className="w-full h-48 object-contain mb-6 group-hover:scale-110 transition-transform duration-500" />
                            <h2 className="text-2xl font-bold text-adventure-mist mb-2 uppercase">{bike.name}</h2>
                            <p className="text-adventure-sage text-sm italic mb-6">{bike.description}</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {bike.specs.map((spec, i) => (
                                    <span key={i} className="text-[10px] uppercase font-bold text-adventure-accent bg-adventure-accent/10 px-3 py-1 border border-adventure-accent/20 italic">{spec}</span>
                                ))}
                            </div>
                            <div className="text-3xl font-black text-adventure-accent">{bike.price}</div>
                        </div>
                    </div>

                    {/* Right: Calendar & Booking */}
                    <div className="bg-adventure-primary/10 border border-white/5 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <button onClick={prevMonth} className="text-adventure-accent hover:text-adventure-mist">←</button>
                            <h3 className="text-xl font-black text-adventure-mist uppercase tracking-widest">
                                {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}
                            </h3>
                            <button onClick={nextMonth} className="text-adventure-accent hover:text-adventure-mist">→</button>
                        </div>

                        <div className="grid grid-cols-7 gap-px mb-8">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-[10px] text-center font-black uppercase tracking-widest text-adventure-accent py-2">{day}</div>
                            ))}
                            {renderCalendar()}
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-center mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-white/5 border border-white/10"></div>
                                    <span className="text-[10px] uppercase text-adventure-sage font-bold">Unavailable</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-adventure-accent"></div>
                                    <span className="text-[10px] uppercase text-adventure-sage font-bold">Selected</span>
                                </div>
                            </div>

                            <input type="text" placeholder="FULL NAME" className="w-full bg-adventure-bg border border-white/10 p-4 text-adventure-mist focus:border-adventure-accent outline-none font-bold uppercase tracking-widest" />
                            <input type="tel" placeholder="PHONE NUMBER" className="w-full bg-adventure-bg border border-white/10 p-4 text-adventure-mist focus:border-adventure-accent outline-none font-bold uppercase tracking-widest" />
                            <input type="text" placeholder="DRIVING LICENCE NUMBER" className="w-full bg-adventure-bg border border-white/10 p-4 text-adventure-mist focus:border-adventure-accent outline-none font-bold uppercase tracking-widest" />

                            <button
                                onClick={() => selectedDate && setBookingSuccess(true)}
                                disabled={!selectedDate}
                                className={cn(
                                    "w-full py-6 font-black uppercase tracking-widest transition-all shadow-2xl",
                                    selectedDate ? "bg-adventure-accent text-adventure-bg hover:bg-adventure-mist hover:tracking-[0.4em]" : "bg-white/5 text-white/20 cursor-not-allowed"
                                )}
                            >
                                Confirm Reservation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function BookingPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<div className="min-h-screen bg-adventure-bg flex items-center justify-center text-adventure-accent uppercase font-black tracking-widest">Loading...</div>}>
                <BookingContent />
            </Suspense>
            <Footer />
        </>
    );
}
