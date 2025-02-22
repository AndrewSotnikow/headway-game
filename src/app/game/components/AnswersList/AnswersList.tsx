import { Typography } from '@/components';
import './AnswersList.scss';
import { IAnswer } from '@/app/game/components/Question/types';
import { ANSWER_LETTERS } from '@/app/game/constants';
import { AnswerComponent } from '@/app/game/components/AnswerComponent/AnswerComponent';

interface Props {
  answers: IAnswer[];
  userAnswers: string[];
  isAnswerShown: boolean;
  onAnswerSelect: (answerId: string) => void;
}

export const AnswersList = ({
  answers,
  userAnswers,
  isAnswerShown,
  onAnswerSelect,
}: Props) => {
  return (
    <div className="container">
      <div className={'c-answersList'}>
        {answers.map(({ text, isCorrect, id }, index) => {
          const isSelected = userAnswers.includes(id);
          const isAnswerRevealed =
            isCorrect || isSelected ? isAnswerShown : false;
          return (
            <AnswerComponent
              key={id}
              isCorrect={isCorrect}
              isSelected={isSelected}
              isAnswerShown={isAnswerRevealed}
              classNames={'c-answersList_answer'}
              onClick={() => onAnswerSelect(id)}
            >
              <div className={'c-answersList_answer-text'}>
                <Typography
                  tag="p"
                  classNames={[
                    'c-answersList_label',
                    't-text',
                    '-f20',
                    '-f14md',
                  ]}
                >
                  {ANSWER_LETTERS[index]}
                </Typography>
                <Typography tag="p" classNames={['t-text', '-f20', '-f14md']}>
                  {text}
                </Typography>
              </div>
            </AnswerComponent>
          );
        })}
      </div>
    </div>
  );
};
