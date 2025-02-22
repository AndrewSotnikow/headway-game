import { useState, useEffect } from 'react';

export const useGameData = () => {
  const [data, setData] = useState(null);
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
        throw new Error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, []);

  return { data, loading };
};
