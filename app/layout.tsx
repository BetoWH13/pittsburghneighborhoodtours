import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pittsburgh Neighborhood Tours",
  description:
    "Explore Pittsburgh's rich history and vibrant culture with curated neighborhood tours. Discover local favorites for dining, shopping, and more!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="hero-gradient text-white sticky top-0 z-50 shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl md:text-2xl font-heading font-bold tracking-wide">
          Pittsburgh Neighborhood Tours
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="/" className="hover:text-gold transition-colors">Home</a>
          <a href="/neighborhoods" className="hover:text-gold transition-colors">Neighborhoods</a>
          <a href="/food-culture" className="hover:text-gold transition-colors">Food & Culture</a>
          <a href="/activities" className="hover:text-gold transition-colors">Activities</a>
          <a href="/guides" className="hover:text-gold transition-colors">Guides</a>
        </div>
        <MobileMenu />
      </nav>
    </header>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
          <a href="/" className="block px-4 py-2 hover:bg-gray-100">Home</a>
          <a href="/neighborhoods" className="block px-4 py-2 hover:bg-gray-100">Neighborhoods</a>
          <a href="/food-culture" className="block px-4 py-2 hover:bg-gray-100">Food & Culture</a>
          <a href="/activities" className="block px-4 py-2 hover:bg-gray-100">Activities</a>
          <a href="/guides" className="block px-4 py-2 hover:bg-gray-100">Guides</a>
        </div>
      </details>
    </div>
  );
}

function Footer() {
  return (
    <footer className="hero-gradient text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-gold">Pittsburgh Neighborhood Tours</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Explore Pittsburgh&apos;s rich history and vibrant culture with curated neighborhood tours.
              Discover local favorites for dining, shopping, and more!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-gold">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/neighborhoods" className="text-gray-300 hover:text-white transition-colors">Neighborhoods</a></li>
              <li><a href="/food-culture" className="text-gray-300 hover:text-white transition-colors">Food & Culture</a></li>
              <li><a href="/activities" className="text-gray-300 hover:text-white transition-colors">Activities</a></li>
              <li><a href="/guides" className="text-gray-300 hover:text-white transition-colors">Guides</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-gold">Popular Neighborhoods</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/neighborhoods/bloomfield" className="text-gray-300 hover:text-white transition-colors">Bloomfield</a></li>
              <li><a href="/neighborhoods/oakland" className="text-gray-300 hover:text-white transition-colors">Oakland</a></li>
              <li><a href="/neighborhoods/north-side" className="text-gray-300 hover:text-white transition-colors">North Side</a></li>
              <li><a href="/neighborhoods/mount-washington" className="text-gray-300 hover:text-white transition-colors">Mount Washington</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Pittsburgh Neighborhood Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
