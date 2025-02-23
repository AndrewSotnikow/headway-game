'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import './page.scss';
import { Button, Typography } from '@/components';
import Hero from '@/assets/svg/StartScreenImage.svg';
import { formatReward } from '@/lib/utils';
import { useGameStore } from '@/app/store';

export default function GameOver() {
  const router = useRouter();
  const { isGameOver, totalPrize, onGameReset } = useGameStore();

  const onTryAgainClick = () => {
    if (!isGameOver) router.replace('/');
    else router.replace('/game');

    onGameReset();
  };

  return (
    <motion.div
      key="game-over"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className={'c-gameOver c-gameOver_background'}>
        <div className={'c-gameOver_content'}>
          <Hero className={'c-gameOver_image'} />
          <div className={'c-gameOver_wrapper'}>
            <div className={'c-gameOver_textContainer'}>
              <Typography
                tag="h1"
                classNames={'c-gameOver_scoreText t-text -f32 -f18md '}
              >
                Total score:
              </Typography>

              <Typography
                tag="h2"
                classNames={[
                  'c-gameOver_text',
                  't-title',
                  '-f32md',
                  '-f56',
                  '-mt8md',
                ]}
              >
                {formatReward(totalPrize)} earned
              </Typography>
            </div>

            <Button
              classNames="t-title -f20 -f14md -primary -mt100md -mb100md -mb48sm"
              onClick={onTryAgainClick}
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
