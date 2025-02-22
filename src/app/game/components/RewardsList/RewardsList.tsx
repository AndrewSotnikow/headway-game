import { formatReward } from '@/lib/utils';
import './RewardsList.scss';
import { IQuestion } from '@/app/game/components/Question/types';
import { Step } from '@/components/Step/Step';

interface Props {
  questions: IQuestion[];
  currentQuestionIndex: number;
}

export const RewardsList = ({ questions, currentQuestionIndex }: Props) => {
  return (
    <div className={'c-rewardsList'}>
      {questions.map((question, index) => (
        <Step
          key={question.id}
          isCurrent={index === currentQuestionIndex}
          isAnswered={index < currentQuestionIndex}
        >
          {formatReward(question.reward)}
        </Step>
      ))}
    </div>
  );
};
