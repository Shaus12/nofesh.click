import Link from "next/link";

export default function RoomNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-foreground mb-2">נכס לא נמצא</h1>
      <p className="text-muted-foreground mb-6 text-center">
        הדף שחיפשת לא קיים או שהנכס הוסר.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
      >
        חזרה לדף הבית
      </Link>
    </div>
  );
}
