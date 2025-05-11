"use client"
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-green-600 text-white shadow-md">
      <Link href="/">
        <div className="flex items-center space-x-2 h-10">
          <img src="/temitopess.png" alt="FreshMart Logo" className="h-100 w-100" />
        </div>
      </Link>
      <nav className="space-x-4 text-2xl">
        <Link className='text-white' href="/login">login</Link>
        <Link className='text-white' href="/signup">signup</Link>
      </nav>
    </header>
  );
};

export default Header;
