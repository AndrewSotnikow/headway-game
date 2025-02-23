import { useEffect, useRef } from 'react';

export function useTimeoutHook() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return timeoutRef;
}
