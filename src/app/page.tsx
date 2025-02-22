'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import Hero from '@/assets/svg/StartScreenImage.svg';
import './page.scss';
import { Button, Typography } from '@/components';

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => router.push('/game'), 800);
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
      <motion.div className={'startScreen_content'}>
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
                classNames="t-title -f20 -f14md -primary"
                onClick={handleStart}
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
