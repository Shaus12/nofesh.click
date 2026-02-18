"use client";

import * as React from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface DateRangePickerProps {
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
    onClose: () => void;
}

export default function DateRangePicker({ dateRange, setDateRange, onClose }: DateRangePickerProps) {
    const [months, setMonths] = React.useState(2);

    React.useEffect(() => {
        const handleResize = () => {
            setMonths(window.innerWidth < 768 ? 1 : 2);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-50 absolute top-full md:left-1/2 md:-translate-x-1/2 left-0 mt-2 w-auto max-w-[90vw] animate-in fade-in zoom-in-95 duration-200">
            <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                locale={he}
                numberOfMonths={months}
                disabled={{ before: new Date() }}
                classNames={{
                    selected: "bg-primary text-white hover:bg-primary/90 rounded-md",
                    range_middle: "bg-primary/20 text-primary hover:bg-primary/30 rounded-none",
                    range_start: "bg-primary text-white hover:bg-primary/90 rounded-l-md rounded-r-none",
                    range_end: "bg-primary text-white hover:bg-primary/90 rounded-r-md rounded-l-none",
                    today: "font-bold text-primary",
                    chevron: "fill-primary",
                    root: "w-full",
                    months: "flex flex-col md:flex-row gap-4",
                    month: "space-y-4",
                }}
            />
            <div className="flex justify-end mt-4 gap-2">
                <button
                    onClick={() => setDateRange(undefined)}
                    className="text-sm text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                    נקה
                </button>
                <button
                    onClick={onClose}
                    className="text-sm bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    סגור
                </button>
            </div>
        </div>
    );
}
