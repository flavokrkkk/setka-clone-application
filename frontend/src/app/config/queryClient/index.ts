import { ERetryOptions, TIME } from "@/shared/utils";
import { DefaultOptions, QueryClient } from "@tanstack/react-query";

const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: TIME.STALE_TIME,
    refetchInterval: TIME.REFETCH_INTERVAL,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    retry: ERetryOptions.QUERY_RETRIES,
    retryDelay: (attempt) =>
      Math.min(TIME.RETRY_DELAY_BASE * 2 ** attempt, TIME.RETRY_DELAY_MAX),
    select: (data) => data,
  },
};
export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});
