import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Step } from './Step';

jest.mock('./StepDecoration.svg', () => {
  const StepSvg = ({ className }: { className: string }) => (
    <svg data-testid="step-svg" className={className} />
  );
  return StepSvg;
});

describe('Step Component', () => {
  it('renders the step with children', () => {
    render(<Step>Step Content</Step>);

    expect(screen.getByTestId('step')).toBeInTheDocument();
    expect(screen.getByText('Step Content')).toBeInTheDocument();
  });

  it('applies "c-step-current" class when isCurrent is true', () => {
    render(<Step isCurrent>Current Step</Step>);

    const step = screen.getByTestId('step');
    expect(step).toHaveClass('c-step-current');
  });

  it('applies "c-step-answered" class when isAnswered is true', () => {
    render(<Step isAnswered>Answered Step</Step>);

    const step = screen.getByTestId('step');
    expect(step).toHaveClass('c-step-answered');
  });

  it('applies both "c-step-current" and "c-step-answered" classes when both props are true', () => {
    render(
      <Step isCurrent isAnswered>
        Current & Answered Step
      </Step>,
    );

    const step = screen.getByTestId('step');
    expect(step).toHaveClass('c-step-current');
    expect(step).toHaveClass('c-step-answered');
  });

  it('renders the step decoration SVG', () => {
    render(<Step>Step Content</Step>);

    expect(screen.getByTestId('step-svg')).toBeInTheDocument();
  });
});
