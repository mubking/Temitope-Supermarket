"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { TbLogout2 } from "react-icons/tb";
import { signOut } from "next-auth/react";


const DashboardNavbar = () => {
  const { cart } = useCart() || {}; // Get the cart from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter(); // ✅ useRouter instead of useNavigate

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // const handleLoginClick = () => {
  //   router.push("/login");
  // };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  return (
    <nav className={`${isScrolled ? 'shadow-md bg-white' : 'bg-white'} sticky top-0 z-30 transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
         <Link href="/" className="flex items-center">
            <img src="/tslogo.png" alt="Logo" className="h-10" />
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-grow mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/wholesale" className="text-gray-700 hover:text-blue-600 font-medium">
                Wholesale

            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-medium">
              Deals
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact Us
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}

              </span>
            </Link>
            <Link href="/dashboard/orders" className="...">
  
</Link>

          <button
              onClick={handleLogout}
              className="flex flex-col items-center p-4 rounded-lg transition hover:bg-red-50 hover:text-red-700"
            >
              <TbLogout2 className="h-5 w-5 mb-1" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>

          {/* Mobile menu controls */}
          <div className="flex items-center md:hidden space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="text-gray-700 hover:text-blue-600"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cart.length}
        </span>
      </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 hover:text-blue-600"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4 py-2">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium py-2">Home</Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium py-2">Categories</Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-medium py-2">Deals</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium py-2">Contact us</Link>
            <Link href="/credit-application" className="text-gray-700 hover:text-blue-600 font-medium py-2">Apply for Credit</Link>
            <hr className="my-2" />
            <Link href="/dashboard/orders" className="...">
  
</Link>

            <button
              onClick={handleLogout}
              className="flex flex-col items-center p-4 rounded-lg transition hover:bg-red-50 hover:text-red-700"
            >
              <TbLogout2 className="h-5 w-5 mb-1" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
