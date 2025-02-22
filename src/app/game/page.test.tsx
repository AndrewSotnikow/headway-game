import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import Game from './page';
import { useGameStore } from '@/app/store/useGameStore';
import { useGameData } from '@/hooks';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/store/useGameStore', () => ({
  useGameStore: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useGameData: jest.fn(),
}));

jest.mock('@/app/game/components', () => ({
  RewardsList: () => <div>RewardsList</div>,
  RewardsMenu: () => <div>RewardsMenu</div>,
  Question: () => <div>Question</div>,
}));

jest.mock(
  '@/app/game/components/Question/questionSkeleton/QuestionSkeleton',
  () => ({
    Skeleton: () => <div>Loading...</div>,
  }),
);

describe('Game Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when data is loading', () => {
    (useGameData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
    });

    (useGameStore as jest.Mock).mockReturnValue({
      isGameOver: false,
      currentQuestionIndex: 0,
    });

    render(<Game />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to game-over page when isGameOver is true', async () => {
    (useGameStore as jest.Mock).mockReturnValue({
      isGameOver: true,
      currentQuestionIndex: 0,
    });

    (useGameData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
    });

    render(<Game />);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/game-over'));
  });

  it('renders the game page correctly when data is available and not loading', () => {
    const mockData = [
      { question: 'What is 2 + 2?', reward: 100 },
      { question: 'What is 3 + 5?', reward: 200 },
    ];

    (useGameStore as jest.Mock).mockReturnValue({
      isGameOver: false,
      currentQuestionIndex: 0,
    });

    (useGameData as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
    });

    render(<Game />);

    expect(screen.getByText('Question')).toBeInTheDocument();
    expect(screen.getByText('RewardsMenu')).toBeInTheDocument();
    expect(screen.getByText('RewardsList')).toBeInTheDocument();
  });
});
