import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verrant — Interior Architecture Studio",
  description:
    "Verrant designs residences and spaces that hold their form long after the trend has passed. Concept, structure, material, light.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ground text-stone font-body antialiased">
        {children}
      </body>
    </html>
  );
}
