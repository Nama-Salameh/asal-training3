import { useEffect, useState } from "react";

export default function usePoll<T>(
  url: string,
  fetcher: (url: string) => Promise<T>,
  refreshInterval: number
) {
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<Error | null>();
  const [isPolling, setIsPolling] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const responseData = await fetcher(url);
      setData(responseData);
      setError(null);
    } catch (error: any) {
      setData(null);
      setError(error);
    }
  };

  const start = () => setIsPolling(true);
  const stop = () => setIsPolling(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPolling) {
        fetchData();
      }
    }, refreshInterval);
    return () => clearInterval(intervalId);
  }, [url, fetcher, refreshInterval, isPolling]);

  return { data, error, trigger: fetchData, start, stop };
}
