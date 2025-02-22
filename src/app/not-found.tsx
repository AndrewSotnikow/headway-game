'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import './not-found.scss';
import { Button, Typography } from '@/components';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Auto-redirect after a few seconds
    const timeout = setTimeout(() => {
      router.replace('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <motion.div
      className="c-notFound"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="c-notFound_content">
        <Typography tag="h1" classNames="t-title -f56 -f32md">
          404 - Page Not Found
        </Typography>
        <Typography tag="p" classNames="t-text -f20 -f14md">
          The page you are looking for doesn’t exist or has been moved.
        </Typography>
        <Button classNames="-primary" onClick={() => router.replace('/')}>
          Go Home
        </Button>
      </div>
    </motion.div>
  );
}
