'use client';

import { ReactNode, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import './page.scss';
import { useGameData } from '@/hooks';
import { useGameStore } from '@/app/store/useGameStore';
import { RewardsList, RewardsMenu, Question } from '@/app/game/components';
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

  if (loading && !data?.length) {
    return <Skeleton />;
  }

  return (
    <Suspense fallback={(<Skeleton />) as ReactNode}>
      <motion.div
        key="game"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className={'gameScreen'}>
          <div className={'gameScreen_question'}>
            <Question
              question={data[currentQuestionIndex]}
              hasNextQuestion={currentQuestionIndex < data.length - 1}
            />
          </div>
          <RewardsMenu
            questions={data}
            currentQuestionIndex={currentQuestionIndex}
          />
          <div className={'gameScreen_prizes'}>
            <RewardsList
              questions={data}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
}
