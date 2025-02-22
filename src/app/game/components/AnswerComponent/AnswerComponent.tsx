import { ReactNode } from 'react';

import './AnswerComponent.scss';
import WrapperSvg from './AnswerComponentDecoration.svg';
import { Button } from '@/components';

export interface Props {
  children: ReactNode;
  isSelected?: boolean;
  isCorrect?: boolean;
  isAnswerShown?: boolean;
  classNames?: string;
  onClick?: () => void;
}

export const AnswerComponent = ({
  children,
  isSelected = false,
  isCorrect = false,
  isAnswerShown = false,
  classNames = '',
  onClick,
}: Props) => {
  const computedClassName = `${'c-answer'} 
    ${isSelected ? 'c-answer-selected' : ''} 
    ${isAnswerShown && isCorrect ? 'c-answer-correct' : ''}
    ${isAnswerShown && !isCorrect ? 'c-answer-wrong' : ''}
    ${isSelected && isAnswerShown && isCorrect ? 'c-answer-correct' : ''}
    ${classNames}
  `;

  return (
    <div className={computedClassName}>
      <Button onClick={onClick}>
        <span className={'c-answer-divider'} />
        <div className={'c-answer-wrapper'}>
          <WrapperSvg className={'c-answer-svg'} />
          <div className={'c-answer-inner'}>{children}</div>
        </div>
        <span className={'c-answer-divider'} />
      </Button>
    </div>
  );
};
