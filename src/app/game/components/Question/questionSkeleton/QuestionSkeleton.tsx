import React from 'react';
import { motion } from 'framer-motion';

import './Skeleton.scss';

export const Skeleton: React.FC = () => {
  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="skeleton">
        <div className="skeleton_leftContainer">
          <div className="skeleton_question -mt133 -mt100md" />
          <div className="skeleton_options -mb122 -mb80md">
            <div className="skeleton_option"></div>
            <div className="skeleton_option"></div>
            <div className="skeleton_option"></div>
            <div className="skeleton_option"></div>
          </div>
        </div>
        <div className="skeleton_progress">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="skeleton_stage"></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
