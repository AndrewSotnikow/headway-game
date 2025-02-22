export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  id: string;
  text: string;
  reward: number;
  answers: IAnswer[];
  minCorrectAnswersCount: number;
}
