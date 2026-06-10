import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold tracking-tight text-blue-600 hover:opacity-90 transition">
          Cine<span className="text-gray-900">Track</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link 
            href="/watchlist" 
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            My Watchlist
          </Link>
        </div>
      </div>
    </nav>
  );
}