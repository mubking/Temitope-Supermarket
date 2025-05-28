"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useCreditRequests() {
  const { data, error, isLoading } = useSWR("/api/credit-requests", fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds
  });

  return {
    requests: data || [],
    isLoading,
    isError: error,
  };
}
    