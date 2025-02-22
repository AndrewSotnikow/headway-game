import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';

import { AnswersList } from './AnswersList';
import { IAnswer } from '@/app/game/components/Question/types';
import { ANSWER_LETTERS } from '@/app/game/constants';

// Mock the AnswerComponent to isolate the AnswersList behavior
jest.mock('@/components', () => ({
  AnswerComponent: ({
    children,
    isSelected,
    isAnswerShown,
    onClick,
  }: {
    children: React.ReactNode;
    isSelected: boolean;
    isAnswerShown: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      data-selected={isSelected}
      data-revealed={isAnswerShown}
    >
      {children}
    </button>
  ),
  Typography: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

const mockAnswers: IAnswer[] = [
  { id: '1', text: 'Answer 1', isCorrect: false },
  { id: '2', text: 'Answer 2', isCorrect: true },
  { id: '3', text: 'Answer 3', isCorrect: false },
  { id: '4', text: 'Answer 4', isCorrect: false },
];

describe('AnswersList Component', () => {
  const mockOnAnswerSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all answers correctly', () => {
    render(
      (
        <AnswersList
          answers={mockAnswers}
          userAnswers={[]}
          isAnswerShown={false}
          onAnswerSelect={mockOnAnswerSelect}
        />
      ) as ReactNode,
    );

    const answerButtons = screen.getAllByRole('button');
    expect(answerButtons).toHaveLength(mockAnswers.length);

    mockAnswers.forEach((answer, index) => {
      expect(screen.getByText(answer.text)).toBeInTheDocument();
      expect(screen.getByText(ANSWER_LETTERS[index])).toBeInTheDocument();
    });
  });

  test('calls onAnswerSelect when an answer is clicked', () => {
    render(
      (
        <AnswersList
          answers={mockAnswers}
          userAnswers={[]}
          isAnswerShown={false}
          onAnswerSelect={mockOnAnswerSelect}
        />
      ) as ReactNode,
    );

    const firstAnswerButton = screen.getAllByRole('button')[0];
    fireEvent.click(firstAnswerButton);

    expect(mockOnAnswerSelect).toHaveBeenCalledWith('1');
  });

  test('applies correct styles when an answer is selected', () => {
    render(
      (
        <AnswersList
          answers={mockAnswers}
          userAnswers={['1']}
          isAnswerShown={false}
          onAnswerSelect={mockOnAnswerSelect}
        />
      ) as ReactNode,
    );

    const firstAnswerButton = screen.getAllByRole('button')[0];
    expect(firstAnswerButton).toHaveAttribute('data-selected', 'true');
    expect(firstAnswerButton).toHaveAttribute('data-revealed', 'false');

    const secondAnswerButton = screen.getAllByRole('button')[1];
    expect(secondAnswerButton).toHaveAttribute('data-selected', 'false');
  });

  test('reveals correct answers when isAnswerShown is true', () => {
    render(
      (
        <AnswersList
          answers={mockAnswers}
          userAnswers={['1']}
          isAnswerShown={true}
          onAnswerSelect={mockOnAnswerSelect}
        />
      ) as ReactNode,
    );

    const firstAnswerButton = screen.getAllByRole('button')[0];
    expect(firstAnswerButton).toHaveAttribute('data-selected', 'true');
    expect(firstAnswerButton).toHaveAttribute('data-revealed', 'true');

    const secondAnswerButton = screen.getAllByRole('button')[1];
    expect(secondAnswerButton).toHaveAttribute('data-selected', 'false');
    expect(secondAnswerButton).toHaveAttribute('data-revealed', 'true');
  });
});
