import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DesktopTopbar from "./components/DesktopTopbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archive",
  description: "An article webpage inspired by Medium.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className='min-h-screen lg:h-screen lg:overflow-hidden'>
        <header className='lg:hidden'>
          <Navbar />
        </header>

        <div className='lg:flex lg:h-full'>
          <aside className='hidden lg:block lg:h-full lg:w-70 lg:shrink-0'>
            <Sidebar />
          </aside>

          <div className='min-w-0 flex-1 lg:flex lg:h-full lg:flex-col'>
            <div className='hidden lg:block lg:shrink-0'>
              <DesktopTopbar />
            </div>

            <main className='min-h-0 flex-1 lg:overflow-y-auto'>
              {children}
            </main>

            <div className='lg:hidden'>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
