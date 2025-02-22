import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import { RewardsList } from './RewardsList';

jest.mock('@/components/Step/Step', () => ({
  Step: ({
    children,
    isCurrent,
    isAnswered,
  }: {
    children: React.ReactNode;
    isCurrent: boolean;
    isAnswered: boolean;
  }) => (
    <div data-current={isCurrent} data-answered={isAnswered}>
      {children}
    </div>
  ),
}));

jest.mock('@/lib/utils', () => ({
  formatReward: (prize: number) => `$${prize}`,
}));

const mockQuestions = [
  { id: '1', text: 'Question 1', reward: 1000, answers: [] },
  { id: '2', text: 'Question 2', reward: 2000, answers: [] },
  { id: '3', text: 'Question 3', reward: 3000, answers: [] },
];

describe('RewardsList Component', () => {
  it('renders the rewards correctly', () => {
    render(
      (
        <RewardsList questions={mockQuestions} currentQuestionIndex={1} />
      ) as ReactNode,
    );

    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('$2000')).toBeInTheDocument();
    expect(screen.getByText('$3000')).toBeInTheDocument();
  });

  it('marks the current and answered steps correctly', () => {
    render(
      (
        <RewardsList questions={mockQuestions} currentQuestionIndex={1} />
      ) as ReactNode,
    );

    const steps = screen.getAllByText(/\$/);
    expect(steps[0]).toHaveAttribute('data-answered', 'true');

    expect(steps[1]).toHaveAttribute('data-answered', 'false');
    expect(steps[1]).toHaveAttribute('data-current', 'true');

    expect(steps[2]).toHaveAttribute('data-answered', 'false');
  });
});
