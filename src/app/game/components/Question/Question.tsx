'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ACTION_DELAY } from '../../constants';
import { getIsAllAnswersCorrect } from '@/lib/utils';
import { Typography } from '@/components';
import './Question.scss';
import { IQuestion } from '@/app/game/components/Question/types';
import { useGameStore } from '@/app/store/useGameStore';
import { AnswersList } from '@/app/game/components/AnswersList';

interface Props {
  question: IQuestion;
  hasNextQuestion: boolean;
}

export const Question = ({ question, hasNextQuestion }: Props) => {
  const router = useRouter();
  const { onNextQuestionMove, onGameOver } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const onAnswersCheck = (userAnswers: string[]) => {
    if (userAnswers.length !== question.minCorrectAnswersCount) return;

    setIsAnswerShown(true);

    if (
      getIsAllAnswersCorrect(question.answers, userAnswers) &&
      hasNextQuestion
    ) {
      setTimeout(() => {
        setSelectedAnswers([]);
        setIsAnswerShown(false);
        onNextQuestionMove(question.reward);
      }, ACTION_DELAY);
      return;
    }

    setTimeout(() => {
      router.push('/c-gameOver');
      onGameOver(question.reward);
    }, ACTION_DELAY);
  };

  const onAnswerSelect = (answerId: string) => {
    if (isAnswerShown) return;

    const updatedAnswers = selectedAnswers.includes(answerId)
      ? selectedAnswers.filter((id) => id !== answerId)
      : [...selectedAnswers, answerId];

    setSelectedAnswers(updatedAnswers);
    onAnswersCheck(updatedAnswers);
  };

  return (
    <div className={'question'}>
      <Typography tag="h2" classNames={['question_text', '-f32', '-f18md']}>
        {question.text}
      </Typography>
      <AnswersList
        answers={question.answers}
        userAnswers={selectedAnswers}
        isAnswerShown={isAnswerShown}
        onAnswerSelect={onAnswerSelect}
      />
    </div>
  );
};
