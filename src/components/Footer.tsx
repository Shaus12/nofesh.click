
export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-12 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">nofesh.click</h3>
                        <p className="text-sm opacity-80">
                            הפלטפורמה המובילה להזמנת צימרים, וילות ובקתות נופש בישראל.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">ניווט מהיר</h4>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><a href="#" className="hover:opacity-100 transition-opacity">צימרים בצפון</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">בקתות במדבר</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">וילות יוקרה</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">הדקה ה-90</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">מידע נוסף</h4>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><a href="#" className="hover:opacity-100 transition-opacity">אודותינו</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">צור קשר</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">מדיניות פרטיות</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">תנאי שימוש</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">עקבו אחרינו</h4>
                        <div className="flex gap-4">
                            {/* Mock Social Icons */}
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer">F</div>
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer">I</div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 pt-8 text-center text-sm opacity-60">
                    © {new Date().getFullYear()} nofesh.click. כל הזכויות שמורות.
                </div>
            </div>
        </footer>
    );
}
