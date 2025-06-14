'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/contexts/ToastContext';

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const doRedirect = async () => {
      if (status === 'authenticated' && session?.user && !hasRedirected) {
        showToast({
          title: 'Redirecting...',
          description: 'Sending you to the admin dashboard.',
          status: 'info',
        });

        setHasRedirected(true);
        await new Promise((res) => setTimeout(res, 1500)); // 1.5s delay
        router.replace('/admin'); // Force admin redirect
      }
    };

    doRedirect();
  }, [status, session, hasRedirected, router, showToast]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-600 animate-pulse">
          Preparing your dashboard...
        </p>
      </div>
    </div>
  );
}
