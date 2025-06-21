// /app/payment/success/page.js

import PaymentSuccessContent from '@/components/PaymentSuccessContent';
import { Suspense } from 'react';

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading payment confirmation...</div>}>
      <PaymentSuccessContent/>
    </Suspense>
  );
}
