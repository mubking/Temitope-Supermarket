'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/contexts/ToastContext';

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const ref = searchParams.get('reference');

    if (ref) {
      axios
        .post('/api/verify-payment', { reference: ref })
        .then(res => {
          if (res.data.status === 'success') {
            showToast({
              title: 'Payment Successful ✅',
              description: 'Thank you! We’ve received your payment.',
              status: 'success',
              duration: 6000,
            });
          } else {
            showToast({
              title: 'Payment Failed ❌',
              description: res.data.message || 'We could not verify your payment.',
              status: 'error',
              duration: 6000,
            });
          }
        })
        .catch(() => {
          showToast({
            title: 'Verification Error ⚠️',
            description: 'An error occurred during payment verification.',
            status: 'error',
            duration: 6000,
          });
        });

      setTimeout(() => router.push('/dashboard'), 3000);
    }
  }, [searchParams, showToast, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold text-green-600">Processing payment...</h1>
    </div>
  );
}
