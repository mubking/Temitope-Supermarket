import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export default function useProducts() {
  const { data, error, isLoading } = useSWR('/api/products', fetcher);
  return {
    products: data?.products || [],
    isLoading,
    isError: error
  };
}
