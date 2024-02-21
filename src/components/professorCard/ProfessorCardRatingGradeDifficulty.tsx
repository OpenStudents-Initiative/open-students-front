import { useIntl } from "react-intl";

interface Props {
  rating: number;
  grade: number;
  difficulty: number;
}

const ProfessorCardRatingGradeDifficulty = ({
  rating,
  grade,
  difficulty,
}: Props) => {
  const intl = useIntl();
  const textConstants = {
    rating: intl.formatMessage({ id: "averageRatingText" }),
    grade: intl.formatMessage({ id: "averageCourseGradeText" }),
    difficulty: intl.formatMessage({ id: "averageDifficultyLevelText" }),
  };

  const roundOrHyphen = (num: number) =>
    typeof num === "number" ? num.toFixed(2) : "—";

  const textsAndNumbers = [
    [textConstants.rating, rating],
    [textConstants.grade, grade],
    [textConstants.difficulty, difficulty],
  ];

  return (
    <div className="bg-secondary p-2 rounded-md my-6">
      <div className="grid grid-cols-3 gap-2">
        {textsAndNumbers.map(([text, num], index) => (
            <div key={index} className="text-xs font-medium ">
              {text}
              <div className="text-lg font-semibold">
                {roundOrHyphen(num as number)}
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorCardRatingGradeDifficulty;
