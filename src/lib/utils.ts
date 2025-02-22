import { IAnswer } from '@/app/game/components/Question/types';

export const getIsAllAnswersCorrect = (
  answers: IAnswer[],
  userAnswers: string[],
): boolean => {
  const correctAnswers = new Set(
    answers.filter((answer) => answer.isCorrect).map((answer) => answer.id),
  );

  return userAnswers.every((answerId) => correctAnswers.has(answerId));
};

export const formatReward = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100);
};
