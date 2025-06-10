import { Suspense } from 'react';
import SearchPageClient from '@/components/SearchPageClient';

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading search page...</p>}>
      <SearchPageClient />
    </Suspense>
  );
}

