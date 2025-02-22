import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import Home from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/assets/svg/StartScreenImage.svg', () => {
  const HeroSvg = ({ className }: { className: string }) => (
    <svg data-testid="hero-svg" className={className} />
  );
  HeroSvg.displayName = 'HeroSvg';
  return HeroSvg;
});

jest.mock('@/components', () => ({
  Button: ({
    classNames,
    onClick,
    children,
  }: {
    classNames: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button type="button" className={classNames} onClick={onClick}>
      {children}
    </button>
  ),
  Typography: ({
    classNames,
    children,
  }: {
    tag: string;
    classNames: string[];
    children: React.ReactNode;
  }) => <div className={classNames.join(' ')}>{children}</div>,
}));

describe('Home Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Home correctly', () => {
    render((<Home />) as ReactNode);

    expect(screen.getByTestId('hero-svg')).toBeInTheDocument();
    expect(
      screen.getByText(/Who wants to be a millionaire\?/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
  });

  it('navigates to /game when Start button is clicked', () => {
    render((<Home />) as ReactNode);

    const startButton = screen.getByRole('button', { name: /Start/i });

    fireEvent.click(startButton);

    expect(mockPush).not.toHaveBeenCalled(); // Transition delay

    setTimeout(() => {
      expect(mockPush).toHaveBeenCalledWith('/game');
    }, 800);
  });
});
