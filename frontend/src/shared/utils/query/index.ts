export const TIME = {
  STALE_TIME: 1000 * 60 * 5,
  REFETCH_INTERVAL: 1000 * 60 * 2,
  RETRY_DELAY_MAX: 30 * 1000,
  RETRY_DELAY_BASE: 1000,
};

export const enum ERetryOptions {
  QUERY_RETRIES = 2,
  MUTATION_RETRIES = 3,
}
