import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function useRealTimeData(endpoint, refreshInterval = 3000) {
  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher, {
    refreshInterval,
  });

  return {
    data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
