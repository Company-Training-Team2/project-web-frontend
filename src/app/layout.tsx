import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "EventHub",
  description: "All Event Services in One Place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <AuthProvider>
          {/* pb-16 reserves room for MobileBottomNav's fixed bar on mobile
              widths so it doesn't cover the last bit of page content; md:pb-0
              drops it once the bar itself hides at the md breakpoint. */}
          <div className="pb-16 md:pb-0">{children}</div>
          <MobileBottomNav />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
