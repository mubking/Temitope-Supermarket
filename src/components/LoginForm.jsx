'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Footer from './Footer';
import { useToast } from '../contexts/ToastContext';

const LoginForm = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("🔐 Attempting login...");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.log("❌ Login error:", result.error);
      let errorMessage = "Something went wrong. Try again.";
      if (result.error === "CredentialsSignin") {
        errorMessage = "Your email or password is not correct.";
      }

      showToast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
      });

      setIsLoading(false);
      return;
    }

    // ✅ Get fresh session from API directly with retry logic
    let session;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const res = await fetch("/api/auth/session");
        session = await res.json();
        console.log(`✅ Fresh Session Attempt ${retryCount + 1}:`, session);

        if (session?.user) {
          break;
        }
        
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
        }
      } catch (error) {
        console.error("Session fetch error:", error);
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    if (!session?.user) {
      console.log("⚠️ Session is empty or missing user after retries");
      showToast({
        title: "Session Error",
        description: "Login worked, but we couldn't load your account. Please try again.",
        status: "error",
      });
      setIsLoading(false);
      return;
    }

    showToast({
      title: "🎉 Login Successful",
      description: `Welcome back, ${session.user.firstName || "User"}!`,
      status: "success",
    });

    console.log(session);


    // 💬 FINAL REDIRECT LOG with explicit isAdmin check
    const isAdmin = Boolean(session.user.isAdmin); // Ensure boolean conversion
    console.log("🔑 User Role:", isAdmin ? "Admin" : "Regular User");
    
    if (isAdmin) {
      console.log("➡️ Redirecting to /admin");
      router.push("/admin");
    } else {
      console.log("➡️ Redirecting to /dashboard");
      router.push("/dashboard");
    }
    
    setIsLoading(false); // Ensure loading state is reset
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
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
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

      <Footer />
    </>
  );
};

export default LoginForm;
