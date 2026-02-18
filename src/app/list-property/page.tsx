"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ListPropertyPage() {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        description: "",
        amenities: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAmenityChange = (amenity: string) => {
        setFormData(prev => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Property submission:", formData);
        alert("הנכס נשלח לאישור בהצלחה (Mock)!");
    };

    const amenitiesList = [
        "אינטרנט אלחוטי", "בריכה", "ג׳קוזי", "חניה", "מטבח מאובזר", "מיזוג אוויר", "טלוויזיה", "מרפסת", "חצר פרטית", "מנגל"
    ];

    return (
        <div className="min-h-screen bg-background font-sans" dir="rtl">
            <Navbar />

            <main className="container mx-auto px-4 py-12 mt-16 max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">רשום את הנכס שלך</h1>
                    <p className="text-muted-foreground text-lg">
                        הצטרף למאות מארחים שמרוויחים מהשכרת הנכס שלהם דרך nofesh.click
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-card shadow-lg rounded-2xl p-8 border border-border space-y-8">

                    {/* Section 1: Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold border-b pb-2 mb-4">פרטי הנכס</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">שם הנכס</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="לדוגמה: אחוזת הנוף הקסום"
                                    className="w-full px-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">מיקום</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    required
                                    placeholder="עיר, יישוב או אזור"
                                    className="w-full px-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">תיאור הנכס</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                placeholder="ספר לאורחים על המקום המיוחד שלך..."
                                className="w-full px-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Section 2: Pricing & Details */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold border-b pb-2 mb-4">מחירים וזמינות</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">מחיר ללילה (₪)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    required
                                    placeholder="0"
                                    min="0"
                                    className="w-full px-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">תמונות</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400 mb-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <p className="text-sm text-muted-foreground">לחץ להעלאת תמונות</p>
                                    <p className="text-xs text-gray-400 mt-1">(PNG, JPG עד 5MB)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Amenities */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold border-b pb-2 mb-4">מתקנים ושירותים</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {amenitiesList.map((amenity) => (
                                <label key={amenity} className="flex items-center space-x-3 space-x-reverse cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary transition-colors"
                                        checked={formData.amenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                    />
                                    <span className="text-foreground group-hover:text-primary transition-colors">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-transform active:scale-95 shadow-md"
                        >
                            פרסם את הנכס
                        </button>
                        <p className="text-center text-sm text-muted-foreground mt-4">
                            בלחיצה על &quot;פרסם&quot; אתה מסכים לתנאי השימוש ומדיניות הפרטיות שלנו.
                        </p>
                    </div>

                </form>
            </main>

            <Footer />
        </div>
    );
}
