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
      console.log('🔄 Redirect Check - Status:', status);
      console.log('👤 Session Data:', session);

      if (status === 'authenticated' && session?.user && !hasRedirected) {
        console.log('✅ User authenticated, checking admin status...');
        
        // Explicitly check and convert isAdmin to boolean
        const isAdmin = Boolean(session.user.isAdmin);
        console.log('🔑 Is Admin?', isAdmin, 'Raw value:', session.user.isAdmin);

        showToast({
          title: 'Redirecting...',
          description: isAdmin
            ? 'Sending you to the admin dashboard.'
            : 'Sending you to your user dashboard.',
          status: 'info',
        });

        setHasRedirected(true);
        
        // Add a small delay to ensure state updates
        await new Promise((res) => setTimeout(res, 1500));
        
        const targetPath = isAdmin ? '/admin' : '/dashboard';
        console.log('🎯 Redirecting to:', targetPath);
        
        try {
          router.replace(targetPath);
        } catch (error) {
          console.error('❌ Redirect Error:', error);
          showToast({
            title: 'Navigation Error',
            description: 'Failed to redirect. Please try again.',
            status: 'error',
          });
        }
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
