import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🎄 Christmas Greetings",
  description: "Share your holiday wishes with everyone! A modern Next.js app for sending Christmas greetings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
