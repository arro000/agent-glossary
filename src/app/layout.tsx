import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Glossary Whiteboard",
  description: "Interactive visual glossary of the AI agent ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full overflow-hidden">{children}</body>
    </html>
  );
}
