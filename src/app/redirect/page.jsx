'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'authenticated') {
      const isAdmin = session?.user?.isAdmin;

      showToast({
        title: 'Redirecting...',
        description: isAdmin
          ? 'Sending you to the admin dashboard.'
          : 'Sending you to your customer dashboard.',
        status: 'info',
      });

      router.replace(isAdmin ? '/admin' : '/dashboard');
    }
  }, [session, status, router, showToast]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-700 text-sm">
      <span className="animate-pulse">Redirecting you to your dashboard...</span>
    </div>
  );
}
