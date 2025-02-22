import React from 'react';
import './Skeleton.scss';

export const Skeleton: React.FC = () => {
  return (
    <div className="skeleton">
      <div className="skeleton_leftContainer">
        <div className="skeleton_question -mt133" />
        <div className="skeleton_options -mb122">
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
  );
};
