"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type LeadBookingFormProps = {
  propertyId: number;
};

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}
function getDayAfterTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

export default function LeadBookingForm({ propertyId }: LeadBookingFormProps) {
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState(getTomorrow());
  const [checkOutDate, setCheckOutDate] = useState(getDayAfterTomorrow());
  const [guestsCount, setGuestsCount] = useState(2);
  const [message, setMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setGuestName("");
    setGuestPhone("");
    setGuestEmail("");
    setCheckInDate(getTomorrow());
    setCheckOutDate(getDayAfterTomorrow());
    setGuestsCount(2);
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from("leads").insert({
        property_id: propertyId,
        guest_name: guestName || null,
        guest_phone: guestPhone,
        guest_email: guestEmail || null,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests_count: guestsCount,
        message: message || null,
      });
      if (insertError) throw insertError;
      setSubmitSuccess(true);
      resetForm();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה בשליחת הבקשה");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 shrink-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="font-bold">
            בקשתך נשלחה בהצלחה! בעל המקום יחזור אליך בקרוב.
          </span>
        </div>
      )}

      <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-foreground mb-4">שלח בקשת הזמנה</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="lead-guest_name" className="block text-sm font-medium text-foreground mb-1">
              שם מלא
            </label>
            <input
              id="lead-guest_name"
              type="text"
              placeholder="שם מלא"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label htmlFor="lead-guest_phone" className="block text-sm font-medium text-foreground mb-1">
              טלפון *
            </label>
            <input
              id="lead-guest_phone"
              type="tel"
              required
              placeholder="050-0000000"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label htmlFor="lead-guest_email" className="block text-sm font-medium text-foreground mb-1">
              אימייל
            </label>
            <input
              id="lead-guest_email"
              type="email"
              placeholder="דוגמה@example.com"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lead-check_in_date" className="block text-xs font-bold text-gray-500 uppercase mb-1">
                תאריך הגעה
              </label>
              <input
                id="lead-check_in_date"
                type="date"
                required
                value={checkInDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                  if (e.target.value >= checkOutDate) {
                    const next = new Date(e.target.value);
                    next.setDate(next.getDate() + 1);
                    setCheckOutDate(next.toISOString().split("T")[0]);
                  }
                }}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label htmlFor="lead-check_out_date" className="block text-xs font-bold text-gray-500 uppercase mb-1">
                תאריך עזיבה
              </label>
              <input
                id="lead-check_out_date"
                type="date"
                required
                value={checkOutDate}
                min={checkInDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lead-guests_count" className="block text-sm font-medium text-foreground mb-1">
              הרכב אורחים *
            </label>
            <input
              id="lead-guests_count"
              type="number"
              required
              min={1}
              max={20}
              value={guestsCount}
              onChange={(e) => setGuestsCount(parseInt(e.target.value, 10) || 1)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label htmlFor="lead-message" className="block text-sm font-medium text-foreground mb-1">
              הודעה
            </label>
            <textarea
              id="lead-message"
              rows={3}
              placeholder="הוסף הודעה או בקשות מיוחדות..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors active:scale-[0.98] shadow-md disabled:opacity-70"
          >
            {submitting ? "שולח..." : "שלח בקשת הזמנה"}
          </button>
        </form>
      </div>
    </>
  );
}
