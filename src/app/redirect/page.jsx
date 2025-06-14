'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.isAdmin) {
        router.replace('/admin'); // 🚀 Admins go here
      } else {
        router.replace('/dashboard'); // 👥 Users go here
      }
    }
  }, [status, session]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600 text-sm">
      Redirecting to your dashboard...
    </div>
  );
}
