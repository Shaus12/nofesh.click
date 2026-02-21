"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { label: "כל הצימרים", href: "/#recommended" },
        { label: "מומלצים", href: "/#recommended" },
        { label: "מועדפים", href: "/wishlist" },
        { label: "הדקה ה-90", href: "/#newsletter" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
                    ? "bg-[#FBFAF9]/85 backdrop-blur-xl border-gray-200/50 py-1.5"
                    : "bg-black/20 backdrop-blur-sm border-transparent py-3"
                    }`}
            >
                <div className="container mx-auto px-6 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <div className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'}`}>
                        <Link href="/">nofesh.click</Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? 'text-gray-700' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Auth / CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Mock Logged In State Toggle (for demo purposes) */}
                        <div className="hidden">
                            {/* Change this to true to see logged in state */}
                        </div>

                        {true ? ( // Simulated Logged In State
                            <div className="relative group">
                                <button className="flex items-center gap-2 border border-gray-300 rounded-full pl-2 pr-4 py-1 hover:shadow-md transition-shadow bg-white">
                                    <div className="w-8 h-8 bg-gray-500 rounded-full text-white flex items-center justify-center text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                                    <div className="py-2">
                                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium text-right">החופשות שלי</Link>
                                        <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium text-right">מועדפים</Link>
                                        <hr className="my-1 border-gray-100" />
                                        <Link href="/list-property" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium text-right">פרסם צימר</Link>
                                        <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium text-right">התנתק</Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? 'text-gray-700' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                                        }`}
                                >
                                    התחברות
                                </Link>
                                <Link
                                    href="/list-property"
                                    className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-sm"
                                >
                                    פרסם צימר
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-800' : 'bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-800' : 'bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'} ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-800' : 'bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-white transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="pt-24 px-8 space-y-6">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-xl font-medium text-gray-800 hover:text-primary transition-colors py-2 border-b border-gray-100"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="pt-4 space-y-4">
                        <Link href="/login" onClick={() => setMenuOpen(false)} className="block text-lg font-medium text-gray-700 hover:text-primary">
                            התחברות
                        </Link>
                        <Link
                            href="/list-property"
                            onClick={() => setMenuOpen(false)}
                            className="block text-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                        >
                            פרסם צימר
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
