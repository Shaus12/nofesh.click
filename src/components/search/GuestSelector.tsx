"use client";

interface Guests {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

interface GuestSelectorProps {
    guests: Guests;
    setGuests: (guests: Guests) => void;
    onClose: () => void;
}

export default function GuestSelector({ guests, setGuests, onClose }: GuestSelectorProps) {
    const updateGuests = (type: keyof Guests, delta: number) => {
        setGuests({
            ...guests,
            [type]: Math.max(0, guests[type] + delta)
        });
    };

    const counters = [
        { key: 'adults', label: 'מבוגרים', sub: 'גיל 13 ומעלה' },
        { key: 'children', label: 'ילדים', sub: 'גילאים 2-12' },
        { key: 'infants', label: 'תינוקות', sub: 'מתחת לגיל 2' },
        { key: 'pets', label: 'חיות מחמד', sub: 'חיות שירות מתקבלות בברכה' },
    ] as const;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-50 absolute top-full left-0 mt-2 w-80 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-6">
                {counters.map((counter) => (
                    <div key={counter.key} className="flex items-center justify-between">
                        <div>
                            <div className="font-bold text-gray-800">{counter.label}</div>
                            <div className="text-sm text-gray-500">{counter.sub}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateGuests(counter.key, -1)}
                                disabled={guests[counter.key] === 0}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                -
                            </button>
                            <span className="w-4 text-center font-medium">{guests[counter.key]}</span>
                            <button
                                onClick={() => updateGuests(counter.key, 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <button
                    onClick={() => setGuests({ adults: 0, children: 0, infants: 0, pets: 0 })}
                    className="text-sm font-semibold underline text-gray-500 hover:text-gray-800"
                >
                    נקה הכל
                </button>
                <button
                    onClick={onClose}
                    className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    סגור
                </button>
            </div>
        </div>
    );
}
