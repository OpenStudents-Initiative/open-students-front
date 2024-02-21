import { useIntl } from "react-intl";

const ReviewDifficultyLevel = ({
  difficultyLevel,
}: {
  difficultyLevel: number;
}) => {
  const intl = useIntl();
  const textConstants = {
    veryDifficult: intl.formatMessage({ id: "veryDifficult" }),
    difficult: intl.formatMessage({ id: "difficult" }),
    average: intl.formatMessage({ id: "average" }),
    easy: intl.formatMessage({ id: "easy" }),
    veryEasy: intl.formatMessage({ id: "veryEasy" }),
  };

  // Placeholder icons as emojis, replace with your SVG icons or icon components
  const customIcons = {
    0: { icon: "😞", label: textConstants.veryDifficult },
    1: { icon: "😞", label: textConstants.veryDifficult },
    2: { icon: "🙁", label: textConstants.difficult },
    3: { icon: "😐", label: textConstants.average },
    4: { icon: "🙂", label: textConstants.easy },
    5: { icon: "😊", label: textConstants.veryEasy },
  };

  const ratingValue = difficultyLevel as 0 | 1 | 2 | 3 | 4 | 5;
  const label = customIcons[ratingValue]?.label || "";

  return (
    <div className="flex items-center">
      <div className="flex">{customIcons[ratingValue]?.icon || ""}</div>
      <div className="ml-2 text-base">{label}</div>
    </div>
  );
};

export default ReviewDifficultyLevel;
