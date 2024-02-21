import ModifyRating from "../ui/modify-rating";
import { useIntl } from "react-intl";

interface CreateReviewRatingProps {
  professorRating: number;
  setProfessorRating: (value: number) => void;
}

const CreateReviewRating = ({
  professorRating,
  setProfessorRating,
}: CreateReviewRatingProps) => {
  const intl = useIntl();
  const textConstants = {
    minimumRating: intl.formatMessage({ id: "minimumRating" }),
    textRating: intl.formatMessage({ id: "rating" }),
  };

  return (
    <div className="mb-2">
      <span>{textConstants.textRating}</span>
      <div className="flex flex-row">
        <ModifyRating value={professorRating} setValue={setProfessorRating} />
        <span className="ml-4">{professorRating}</span>
      </div>
    </div>
  );
};

export default CreateReviewRating;
