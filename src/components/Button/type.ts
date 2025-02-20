import React, { ReactNode } from 'react';

export interface IButtonProps {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  css?: string;
  onClick?: () => void;
  icon?: ReactNode; // Accepts any icon component
  iconPosition?: 'left' | 'right'; // Determines icon placement
  layout?: 'primary' | 'secondary' | 'borderLess';
  type?: 'button' | 'submit';
}
