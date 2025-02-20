import React, { JSX, ReactNode } from 'react';
import { clsx } from 'clsx';

import './Typography.scss';

interface Props {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  classNames?: string | string[];
}

export const Typography = ({ tag, children, classNames }: Props) => {
  const Tag = tag as keyof JSX.IntrinsicElements;
  return <Tag className={clsx(classNames)}>{children}</Tag>;
};

<h1></h1>;
