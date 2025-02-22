'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import './page.scss';
import { Button, Typography } from '@/components';
import Hero from '@/assets/svg/StartScreenImage.svg';
import { formatPrize } from '@/lib/utils';
import { useGameStore } from '@/app/store';

export default function GameOver() {
  const router = useRouter();
  const { isGameOver, totalPrize, onGameReset } = useGameStore();

  useEffect(() => {
    if (!isGameOver) {
      router.replace('/');
    }
  }, [isGameOver, router]);

  const onTryAgainClick = () => {
    onGameReset();
    router.replace('/game');
  };

  return (
    <div className={'c-gameOver_background'}>
      <div className={'c-gameOver_content'}>
        <Hero className={'c-gameOver_content_image'} />

        <div className={'c-gameOver_content_wrapper'}>
          <div className={'c-gameOver_content_text-wrapper'}>
            <Typography
              tag="h2"
              classNames={' c-gameOver_content_text-title t-text -f32 -f18md'}
            >
              Total score:
            </Typography>
            <Typography tag="h1" classNames={'t-title -f56 -f32md'}>
              {formatPrize(totalPrize)} earned
            </Typography>
          </div>

          <div className={'c-gameOver-desktop-button'}>
            <Button classNames={'-primary'} onClick={onTryAgainClick}>
              Try again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
