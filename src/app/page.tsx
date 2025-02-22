'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import Hero from '@/assets/svg/StartScreenImage.svg';
import './page.scss';
import { Button, Typography } from '@/components';
import { GAME_START_DELAY } from '@/app/game/constants';

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => router.push('/game'), GAME_START_DELAY);
  };

  return (
    <motion.div
      className={'startScreen'}
      initial={{ opacity: 1, scale: 1 }}
      animate={
        !isExiting ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
      }
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="startScreen startScreen_background">
        <div className={'startScreen_content'}>
          <Hero className={'startScreen_image'} />
          <div className={'startScreen_wrapper'}>
            <Typography
              tag="h1"
              classNames={['startScreen_text', 't-title', '-f32md', '-f56']}
            >
              Who wants to be a millionaire?
            </Typography>

            <Button
              classNames="t-title -f20 -f14md -primary -mt100md -mb100md -mb48sm"
              onClick={handleStart}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
