'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { DELAY_1000, DELAY_300 } from '../../constants';
import { getIsAllAnswersCorrect } from '@/lib/utils';
import { Typography } from '@/components';
import './Question.scss';
import { IQuestion } from '@/app/game/components/Question/types';
import { useGameStore } from '@/app/store/useGameStore';
import { AnswersList } from '@/app/game/components/AnswersList';
import { useTimeoutHook } from '@/hooks';

interface Props {
  question: IQuestion;
  hasNextQuestion: boolean;
}

export const Question = ({ question, hasNextQuestion }: Props) => {
  const router = useRouter();
  const { onNextQuestionMove, onGameOver } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const timeoutRef = useTimeoutHook();

  const handleCorrectAnswer = () => {
    timeoutRef.current = setTimeout(() => {
      setSelectedAnswers([]);
      setIsAnswerShown(false);
      onNextQuestionMove(question.reward);
    }, DELAY_1000);
  };

  const handleGameOver = () => {
    timeoutRef.current = setTimeout(() => {
      router.push('/game-over');
      onGameOver(question.reward);
    }, DELAY_1000);
  };

  const onAnswersCheck = (userAnswers: string[]) => {
    if (userAnswers.length !== question.minCorrectAnswersCount) return;

    timeoutRef.current = setTimeout(() => {
      setIsAnswerShown(true);
    }, DELAY_300);

    if (
      getIsAllAnswersCorrect(question.answers, userAnswers) &&
      hasNextQuestion
    ) {
      handleCorrectAnswer();
    } else {
      handleGameOver();
    }
  };

  const onAnswerSelect = (answerId: string) => {
    if (isAnswerShown) return;

    setSelectedAnswers((prev) =>
      prev.includes(answerId)
        ? prev.filter((id) => id !== answerId)
        : [...prev, answerId],
    );

    onAnswersCheck([...selectedAnswers, answerId]);
  };

  return (
    <div className="question">
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
