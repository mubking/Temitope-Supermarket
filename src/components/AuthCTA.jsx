"use client"
import Link from 'next/link';

const AuthCTA = () => {
  return (
    <div className="bg-green-600 py-10 text-center">
      <h2 className="text-xl font-semibold mb-4">Get Started</h2>
      <p className="mb-4">Login or create an account to shop smarter and apply for credit!</p>
      <Link href="/login">
        <div className="px-6 py-2 bg-black text-white rounded-xl mr-4">Login</div>
      </Link>
      <Link href="/signup">
        <div className="px-6 mt-5 py-2 bg-white border border-green-600 text-green-600 rounded-xl">Sign Up</div>
      </Link>
    </div>
  );
};

export default AuthCTA;
