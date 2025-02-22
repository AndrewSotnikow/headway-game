import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactNode } from 'react';

import { AnswerComponent } from './AnswerComponent';

jest.mock('./AnswerComponentDecoration.svg', () => {
  const MockedSvg = () => <svg data-testid="mocked-svg" />;
  return MockedSvg;
});

describe('AnswerComponent', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children correctly', () => {
    render(
      (
        <AnswerComponent>
          <span>Answer Text</span>
        </AnswerComponent>
      ) as ReactNode,
    );

    expect(screen.getByText('Answer Text')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    render(
      (
        <AnswerComponent onClick={mockOnClick}>
          <span>Click Me</span>
        </AnswerComponent>
      ) as ReactNode,
    );

    const button = screen.getByText('Click Me').closest('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('applies "c-answer-selected" class when isSelected is true', () => {
    render(
      (
        <AnswerComponent isSelected>
          <span>Selected Answer</span>
        </AnswerComponent>
      ) as ReactNode,
    );

    const answerDiv = screen.getByText('Selected Answer').closest('.c-answer');
    expect(answerDiv).toHaveClass('c-answer-selected');
  });

  test('applies "c-answer-correct" class when answer is correct and shown', () => {
    render(
      (
        <AnswerComponent isCorrect isAnswerShown>
          <span>Correct Answer</span>
        </AnswerComponent>
      ) as ReactNode,
    );

    const answerDiv = screen.getByText('Correct Answer').closest('.c-answer');
    expect(answerDiv).toHaveClass('c-answer-correct');
  });

  test('applies "c-answer-wrong" class when answer is incorrect and shown', () => {
    render(
      (
        <AnswerComponent isCorrect={false} isAnswerShown>
          <span>Wrong Answer</span>
        </AnswerComponent>
      ) as ReactNode,
    );

    const answerDiv = screen.getByText('Wrong Answer').closest('.c-answer');
    expect(answerDiv).toHaveClass('c-answer-wrong');
  });

  test('applies all relevant classes when answer is selected and revealed', () => {
    render(
      (
        <AnswerComponent isSelected isCorrect isAnswerShown>
          <span>Final Answer</span>
        </AnswerComponent>
      ) as ReactNode,
    );

    const answerDiv = screen.getByText('Final Answer').closest('.c-answer');
    expect(answerDiv).toHaveClass('c-answer-selected');
    expect(answerDiv).toHaveClass('c-answer-correct');
  });
});
