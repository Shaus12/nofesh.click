/* eslint-disable @next/next/no-img-element */

const listings = [
    {
        id: 1,
        title: "אחוזת היער",
        location: "אמירים, גליל עליון",
        price: "₪1,200",
        rating: "4.98",
        image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "נוף לחרמון",
        location: "נווה אטי״ב",
        price: "₪1,500",
        rating: "4.85",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Desert Soul",
        location: "מצפה רמון",
        price: "₪950",
        rating: "4.92",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "וילה בכרם",
        location: "זכרון יעקב",
        price: "₪2,200",
        rating: "4.95",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "הבקתה הכפרית",
        location: "רמת הגולן",
        price: "₪850",
        rating: "4.76",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "סוויטה רומנטית",
        location: "ראש פינה",
        price: "₪1,100",
        rating: "4.88",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop",
    },
];

const regions = [
    {
        name: "גליל עליון",
        count: "128 צימרים",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "רמת הגולן",
        count: "95 צימרים",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "מצפה רמון",
        count: "67 צימרים",
        image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "ים המלח",
        count: "54 צימרים",
        image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=600&auto=format&fit=crop",
    },
];

const testimonials = [
    {
        name: "מיכל לוי",
        location: "תל אביב",
        text: "חוויה מדהימה! הצימר היה מושלם, הנוף עוצר נשימה והשירות היה מעל ומעבר. בהחלט נחזור!",
    },
    {
        name: "יוסי כהן",
        location: "ירושלים",
        text: "סוף שבוע רומנטי מושלם! הג׳קוזי, הקמין והאווירה - הכל היה פשוט מדהים. תודה!",
    },
    {
        name: "שירה אברהם",
        location: "חיפה",
        text: "המקום הכי יפה שהייתי בו! הנוף למדבר בזריחה היה שווה כל שקל. ממליצה בחום!",
    },
];

const features = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        ),
        title: "המחיר הטוב ביותר",
        description: "אנו מבטיחים את המחיר המשתלם ביותר להזמנה ישירה.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
        ),
        title: "נכסים מאומתים",
        description: "כל הנכסים באתר נבדקו ואומתו על ידי הצוות שלנו.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>
        ),
        title: "שירות אישי",
        description: "צוות שירות הלקוחות שלנו זמין עבורכם 24/7.",
    },
];

export default function Features() {
    return (
        <div className="py-24 space-y-24">

            {/* ===== Recommended Listings ===== */}
            <section id="recommended" className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">המומלצים שלנו</h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">הצימרים והוילות הפופולריים ביותר שנבחרו על ידי הצוות שלנו</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listings.map((item) => (
                        <div key={item.id} className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border cursor-pointer">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Heart icon */}
                                <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                                {/* Rating badge */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                                    <span className="text-yellow-500">★</span>
                                    <span>{item.rating}</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span>{item.location}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-primary font-bold text-lg">{item.price}</span>
                                        <span className="text-muted-foreground text-sm mr-1">/ לילה</span>
                                    </div>
                                    <button className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                                        הזמן עכשיו
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Discover by Region ===== */}
            <section id="regions" className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">גלה לפי אזור</h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">בחרו את היעד המושלם לחופשה הבאה שלכם</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {regions.map((region, idx) => (
                        <div key={idx} className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]">
                            <img
                                src={region.image}
                                alt={region.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            {/* Text */}
                            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                                <h3 className="text-2xl font-bold mb-1">{region.name}</h3>
                                <p className="text-white/80 text-sm">{region.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Why Choose Us ===== */}
            <section className="bg-primary/5 py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">למה להזמין דרך nofesh.click?</h2>
                    <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">אנחנו כאן כדי להבטיח שהחופשה שלכם תהיה מושלמת</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-card p-8 rounded-2xl shadow-sm border border-border text-center hover:shadow-md transition-shadow group">
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Testimonials ===== */}
            <section className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">מה אומרים האורחים שלנו</h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">חוות דעת אמיתיות מאורחים שנהנו מהשירות שלנו</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-card p-8 rounded-2xl border border-border hover:shadow-md transition-shadow">
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <span key={s} className="text-yellow-400 text-lg">★</span>
                                ))}
                            </div>
                            <p className="text-foreground leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{t.name}</p>
                                    <p className="text-muted-foreground text-xs">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Newsletter ===== */}
            <section id="newsletter" className="bg-primary py-20">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">קבל הצעות מיוחדות ישירות למייל</h2>
                    <p className="text-white/80 mb-8">הירשם לניוזלטר שלנו וקבל עדכונים על חופשות חלומיות ומבצעים בלעדיים.</p>
                    <div className="flex gap-3 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="כתובת המייל שלך"
                            className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                        />
                        <button className="bg-white text-primary px-8 py-3.5 rounded-full font-bold hover:bg-white/90 transition-colors shadow-lg">
                            הרשמה
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
