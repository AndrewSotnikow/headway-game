import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';

import { RewardsMenu } from './RewardsMenu';

jest.mock('../RewardsList', () => ({
  RewardsList: () => <div data-testid="prizes-list">RewardsList</div>,
}));

jest.mock('@/assets/svg/Menu.svg', () => {
  const MenuIcon = () => <svg data-testid="menu-icon" />;
  return MenuIcon;
});
jest.mock('@/assets/svg/Close.svg', () => {
  const CloseIcon = () => <svg data-testid="close-icon" />;
  return CloseIcon;
});

const mockQuestions = [
  {
    id: 1,
    text: 'Question 1',
    answers: [],
    reward: 100,
    minCorrectAnswersCount: 1,
  },
  {
    id: 2,
    text: 'Question 2',
    answers: [],
    reward: 200,
    minCorrectAnswersCount: 1,
  },
];

describe('RewardsMenu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders menu button correctly', () => {
    render(
      (
        <RewardsMenu questions={mockQuestions} currentQuestionIndex={0} />
      ) as ReactNode,
    );

    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  test('opens and closes the menu on button click', () => {
    render(
      (
        <RewardsMenu questions={mockQuestions} currentQuestionIndex={0} />
      ) as ReactNode,
    );

    const menuButton = screen.getByRole('button');
    const menuContainer = screen.getByTestId('prizes-list').parentElement;

    expect(menuContainer).not.toHaveClass('c-prizesMobile--open');

    fireEvent.click(menuButton);
    expect(menuContainer).toHaveClass('c-prizesMobile--open');

    fireEvent.click(menuButton);
    expect(menuContainer).not.toHaveClass('c-prizesMobile--open');
  });
});
