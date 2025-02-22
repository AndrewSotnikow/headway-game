import { ReactNode } from 'react';

import WrapperSvg from './StepDecoration.svg';
import './Step.scss';

interface Props {
  isCurrent?: boolean;
  isAnswered?: boolean;
  children: ReactNode;
}

export const Step = ({
  isCurrent = false,
  isAnswered = false,
  children,
}: Props) => {
  return (
    <div
      data-testid="step"
      className={`c-step ${isCurrent ? 'c-step-current' : ''}
      ${isAnswered ? 'c-step-answered' : ''}`}
    >
      <span
        className={`${isCurrent ? 'c-step-divider -current' : 'c-step-divider'}`}
      />
      <div className={'c-step-wrapper'}>
        <WrapperSvg className={'c-step-svg'} />
        <div
          className={`${isCurrent ? 'c-step-inner -current-color' : 'c-step-inner'}`}
        >
          {children}
        </div>
      </div>
      <span
        className={`${isCurrent ? 'c-step-divider -current' : 'c-step-divider'}`}
      />
    </div>
  );
};
