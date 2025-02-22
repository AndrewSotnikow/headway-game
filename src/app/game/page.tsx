'use client';

import { ReactNode, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import './page.scss';
import { useGameData } from '@/hooks';
import { useGameStore } from '@/app/store/useGameStore';
import { PrizesList, PrizesMenu, Question } from '@/app/game/components';
import { Skeleton } from '@/app/game/components/Question/questionSkeleton/QuestionSkeleton';

export default function Game() {
  const router = useRouter();
  const { isGameOver, currentQuestionIndex } = useGameStore();

  const { data, loading } = useGameData();

  useEffect(() => {
    if (isGameOver) {
      router.push('/game-over');
    }
  }, [isGameOver, router]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Suspense fallback={(<Skeleton />) as ReactNode}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className={'gameScreen'}>
          <div className={'gameScreen_question'}>
            <Question
              question={data[currentQuestionIndex]}
              hasNextQuestion={currentQuestionIndex < data.length - 1}
            />
          </div>
          <PrizesMenu
            questions={data}
            currentQuestionIndex={currentQuestionIndex}
          />
          <div className={'gameScreen_prizes'}>
            <PrizesList
              questions={data}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
}
