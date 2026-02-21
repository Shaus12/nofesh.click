import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הרשמה",
  description: "צור חשבון ב-nofesh.click והתחל להזמין צימרים, וילות ובקתות נופש בישראל.",
  robots: { index: true, follow: true },
};

export default function SignupLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
