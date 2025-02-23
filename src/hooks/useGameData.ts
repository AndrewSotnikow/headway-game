import { useState, useEffect } from 'react';

import { IQuestion } from '@/app/game/components/Question/types';

export const useGameData = () => {
  const [data, setData] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch('/api/game');

        const result = await response.json();

        if (!response.ok)
          throw new Error(result.error || 'Failed to load data');

        setData(result.data.questions);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, []);

  return { data, loading };
};
