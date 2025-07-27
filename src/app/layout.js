"use client";
import { AuthProvider } from "@/components/AuthProvider";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-[#F9FAFB]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
