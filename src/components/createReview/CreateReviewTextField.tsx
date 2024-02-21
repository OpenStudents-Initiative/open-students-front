import { useIntl } from "react-intl";
import { Textarea } from "../ui/textarea";

interface CreateReviewTextFieldProps {
  reviewText: string;
  setReviewText: (value: string) => void;
  showError: boolean;
  setShowError: (value: boolean) => void;
}

const CreateReviewTextField = ({
  reviewText,
  setReviewText,
  showError,
  setShowError,
}: CreateReviewTextFieldProps) => {
  const intl = useIntl();
  const textConstants = {
    createReviewText: intl.formatMessage({ id: "createReviewText" }),
    textfieldCannotBeEmpty: intl.formatMessage({
      id: "textfieldCannotBeEmpty",
    }),
  };

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setReviewText(e.target.value);
    setShowError(false); // Hide the error message if text field is not empty
  };

  const handleBlur = () => {
    // Show error message if text field is empty on blur
    setShowError(reviewText.trim().length < 5);
  };

  return (
    <div className="my-2">
      <Textarea
        className="resize-y"
        placeholder={textConstants.createReviewText}
        value={reviewText}
        onChange={handleTextFieldChange}
        onBlur={handleBlur}
      />

      {showError && (
        <span className="text-red-400 mt-2">
          {textConstants.textfieldCannotBeEmpty}
        </span>
      )}
    </div>
  );
};

export default CreateReviewTextField;
