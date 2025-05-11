'use client';
import { useState } from 'react';
import Link from 'next/link';
import Footer from './Footer';
// import { useToast } from '../contexts/ToastContext';

const LoginForm = () => {
  // const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // setTimeout(() => {
    //   if (email && password) {
    //     showToast('Login successful! Welcome back to Temitope Supermarket!', 'success');
    //   } else {
    //     showToast('Login failed! Please check your credentials and try again.', 'error');
    //   }
    //   setIsLoading(false);
    // }, 1500);
  };

  return (
    <>
 <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your Temitope Supermarket account</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Don't have an account?</span>{' '}
        <Link href="/register" className="text-blue-600 hover:underline font-medium">
          Create account
        </Link>
      </div>
    
    </div>
    <div>
      <Footer/>
    </div>
    </>
   
    
  );
};

export default LoginForm;
