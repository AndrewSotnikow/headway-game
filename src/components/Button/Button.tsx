import React, { ReactNode } from 'react';

import './button.module.scss';
import { IButtonProps } from '@/components/Button/type';

const Button = ({
  layout = 'primary',
  loading = false,
  disabled = false,
  children,
  css,
  onClick,
  icon,
  iconPosition = 'left',
}: IButtonProps): ReactNode => {
  const baseClass = 'c-btn';
  const layoutClass = ` -${layout}`;
  const disabledClass = disabled ? ' -disabled' : '';
  const loadingClass = loading ? ' -loading -disabled' : '';
  const extraClass = `${layoutClass}${loadingClass}${disabledClass}`;

  return (
    <button
      className={`${baseClass} ${css || ''}${extraClass}`}
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

export default Button;
