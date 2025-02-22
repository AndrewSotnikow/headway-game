import { formatPrize } from '@/lib/utils';
import styles from './PrizesList.module.css';
import { IQuestion } from '@/app/game/components/Question/types';
import { Step } from '@/components/Step/Step';

interface Props {
  questions: IQuestion[];
  currentQuestionIndex: number;
}

export const PrizesList = ({ questions, currentQuestionIndex }: Props) => {
  return (
    <div className={styles['prizes-list']}>
      {questions.map((question, index) => (
        <Step
          key={question.id}
          isCurrent={index === currentQuestionIndex}
          isAnswered={index < currentQuestionIndex}
        >
          {formatPrize(question.reward)}
        </Step>
      ))}
    </div>
  );
};
