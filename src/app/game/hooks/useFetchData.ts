import { useEffect, useState } from 'react';

export function useFetchData() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/gameApi')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuestions(data.data.questions);
        } else {
          throw new Error(data.error || 'Failed to fetch questions');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    questions,
    loading,
    error,
  };
}
