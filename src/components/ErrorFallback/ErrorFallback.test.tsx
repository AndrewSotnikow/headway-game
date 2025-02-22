import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

import GameOver from '@/app/game-over/page';
import { useGameStore } from '@/app/store';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/store', () => ({
  useGameStore: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  formatReward: (prize: number) => `$${prize}`,
}));

jest.mock('@/assets/svg/StartScreenImage.svg', () => {
  const HeroSvg = ({ className }: { className: string }) => (
    <svg data-testid="hero-svg" className={className} />
  );
  return HeroSvg;
});

jest.mock('@/components/Button/Button.tsx', () => ({
  Button: ({
    classNames,
    onClick,
    children,
  }: {
    classNames: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button type="button" onClick={onClick} className={classNames}>
      {children}
    </button>
  ),
  Typography: ({
    classNames,
    children,
  }: {
    classNames: string;
    children: React.ReactNode;
  }) => <div className={classNames}>{children}</div>,
}));

describe('GameOver Component', () => {
  const mockReplace = jest.fn();
  const mockOnGameReset = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    (useGameStore as jest.Mock).mockReturnValue({
      isGameOver: true,
      totalPrize: 1000,
      onGameReset: mockOnGameReset,
    });

    jest.clearAllMocks();
  });

  it('renders the GameOver component with correct elements', () => {
    render(<GameOver />);

    expect(screen.getByTestId('hero-svg')).toBeInTheDocument();
    expect(screen.getByText(/Total score:/i)).toBeInTheDocument();
    expect(screen.getByText('$1000 earned')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Try again/i }),
    ).toBeInTheDocument();
  });

  it('calls onGameReset and router.replace on "Try again" click', () => {
    render(<GameOver />);

    fireEvent.click(screen.getByRole('button', { name: /Try again/i }));

    expect(mockOnGameReset).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/game');
  });

  it('redirects to home page if isGameOver is false', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      isGameOver: false,
      totalPrize: 0,
      onGameReset: mockOnGameReset,
    });

    render(<GameOver />);

    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
