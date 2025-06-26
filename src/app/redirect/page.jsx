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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const doRedirect = async () => {
      try {
        console.log('🔄 Redirect Check - Status:', status);
        console.log('👤 Session Data:', session);

        if (status === 'loading') {
          console.log('⏳ Session still loading...');
          return;
        }

        if (status === 'unauthenticated') {
          console.log('❌ User not authenticated');
          router.replace('/login');
          return;
        }

        if (status === 'authenticated' && session?.user && !hasRedirected) {
          console.log('✅ User authenticated, checking admin status...');
          
          const isAdmin = Boolean(session.user.isAdmin);
          console.log('🔑 Is Admin?', isAdmin, 'Raw value:', session.user.isAdmin);
          console.log('📦 Full session:', JSON.stringify(session, null, 2));

          showToast({
            title: 'Redirecting...',
            description: isAdmin
              ? 'Sending you to the admin dashboard.'
              : 'Sending you to your user dashboard.',
            status: 'info',
          });

          setHasRedirected(true);
          
          await new Promise((res) => setTimeout(res, 2000));

          // ✅ Updated admin target path
          const targetPath = isAdmin ? '/admin/dashboard' : '/dashboard';
          console.log('🎯 Redirecting to:', targetPath);

          try {
            await router.replace(targetPath);
          } catch (error) {
            console.error('❌ Redirect Error:', error);
            showToast({
              title: 'Navigation Error',
              description: 'Failed to redirect. Please try again.',
              status: 'error',
            });
          }
        }
      } catch (error) {
        console.error('❌ Redirect Process Error:', error);
        showToast({
          title: 'Error',
          description: 'Something went wrong during redirection.',
          status: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    doRedirect();
  }, [status, session, hasRedirected, router, showToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600 animate-pulse">
            Loading your session...
          </p>
        </div>
      </div>
    );
  }

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
