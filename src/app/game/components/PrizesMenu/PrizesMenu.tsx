'use client';

import { useState } from 'react';

import Menu from '@/assets/svg/Menu.svg';
import Close from '@/assets/svg/Close.svg';
import { PrizesList } from '../PrizesList';
import './PrizesMenu.scss';
import { IQuestion } from '@/app/game/components/Question/types';

interface Props {
  questions: IQuestion[];
  currentQuestionIndex: number;
}

export const PrizesMenu = ({ questions, currentQuestionIndex }: Props) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className="c-prizesMobile_menuButton"
      >
        {isMenuOpened ? (
          <Close width={24} height={24} />
        ) : (
          <Menu width={24} height={24} />
        )}
      </button>

      <div
        className={`c-prizesMobile ${isMenuOpened ? 'c-prizesMobile--open' : ''}`}
      >
        <PrizesList
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>
    </>
  );
};
