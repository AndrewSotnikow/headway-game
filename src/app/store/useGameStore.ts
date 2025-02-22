import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  isGameOver: boolean;
  currentQuestionIndex: number;
  totalPrize: number;
  onNextQuestionMove: (questionPrize: number) => void;
  onGameOver: (questionPrize: number) => void;
  onGameReset: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      isGameOver: false,
      currentQuestionIndex: 0,
      totalPrize: 0,

      onNextQuestionMove: (questionPrize: number) =>
        set((state) => ({
          totalPrize: state.totalPrize + questionPrize,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        })),

      onGameOver: (questionPrize: number) =>
        set(() => ({
          isGameOver: true,
          totalPrize: questionPrize,
        })),

      onGameReset: () =>
        set(() => ({
          isGameOver: false,
          currentQuestionIndex: 0,
          totalPrize: 0,
        })),
    }),
    {
      name: 'game-storage',
      getStorage: () => localStorage,
    },
  ),
);
