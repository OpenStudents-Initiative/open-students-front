import { useIntl } from "react-intl";
import DifficultyRating from "../ui/difficulty-rating";

interface ReviewDifficultyProps {
  difficultyRating: number;
  setDifficultyRating: (value: number) => void;
}

const CreateReviewDifficulty = ({
  difficultyRating,
  setDifficultyRating,
}: ReviewDifficultyProps) => {
  const intl = useIntl();
  const textConstants = {
    veryDifficult: intl.formatMessage({ id: "veryDifficult" }),
    difficult: intl.formatMessage({ id: "difficult" }),
    average: intl.formatMessage({ id: "average" }),
    easy: intl.formatMessage({ id: "easy" }),
    veryEasy: intl.formatMessage({ id: "veryEasy" }),
    difficultyMustBeSelected: intl.formatMessage({
      id: "difficultyMustBeSelected",
    }),
    difficultyText: intl.formatMessage({ id: "difficulty" }),
  };

  const customIcons: {
    [index: string]: {
      label: string;
    };
  } = {
    0: {
      label: textConstants.veryDifficult,
    },
    1: {
      label: textConstants.veryDifficult,
    },
    2: {
      label: textConstants.difficult,
    },
    3: {
      label: textConstants.average,
    },
    4: {
      label: textConstants.easy,
    },
    5: {
      label: textConstants.veryEasy,
    },
  };

  return (
    <div className="mb-4">
      <span>{textConstants.difficultyText}</span>
      <div className="flex">
        <DifficultyRating
          value={difficultyRating}
          setValue={setDifficultyRating}
        />
        <span className="ml-2 align-middle">
          {typeof difficultyRating === "number"
            ? customIcons[difficultyRating.toFixed(0)].label
            : ""}
        </span>
      </div>
    </div>
  );
};

export default CreateReviewDifficulty;
