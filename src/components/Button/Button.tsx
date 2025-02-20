import React, { ReactNode } from 'react';
import './Button.scss';
import { clsx } from 'clsx';

import { IButtonProps } from '@/components/Button/type';

export const Button = ({
  layout = 'primary',
  loading = false,
  disabled = false,
  children,
  classNames,
  onClick,
  icon,
  iconPosition = 'left',
}: IButtonProps): ReactNode => {
  const baseClass = 'c-btn';
  const layoutClass = ` -${layout}`;
  const disabledClass = disabled ? ' -disabled' : '';
  const loadingClass = loading ? ' -loading -disabled' : '';
  const extraClass = `${layoutClass}${loadingClass}${disabledClass}`;

  const computedClassName = clsx(baseClass, extraClass, classNames);

  return (
    <button
      className={computedClassName}
      data-testid="button"
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      {/* Left Icon */}
      {icon && iconPosition === 'left' && (
        <span className="c-btn-icon">{icon}</span>
      )}

      {children}

      {/* Right Icon */}
      {icon && iconPosition === 'right' && (
        <span className="c-btn-icon">{icon}</span>
      )}
    </button>
  );
};
