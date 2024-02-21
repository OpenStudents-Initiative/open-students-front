import { useIntl } from "react-intl";
import { Button } from "../ui/button";

interface CreateReviewWouldTakeAgainProps {
  wouldTakeAgain: boolean;
  setWouldTakeAgain: (value: boolean) => void;
}

const CreateReviewWouldTakeAgain = ({
  wouldTakeAgain,
  setWouldTakeAgain,
}: CreateReviewWouldTakeAgainProps) => {
  const intl = useIntl();
  const textConstants = {
    wouldTakeAgainText: intl.formatMessage({ id: "wouldTakeAgainText" }),
    wouldNotTakeAgainText: intl.formatMessage({ id: "wouldNotTakeAgainText" }),
  };

  return (
    <div className="flex mb-6">
      <Button
        onClick={() => setWouldTakeAgain(true)}
        className={`bg-transparent w-36 h-24 mr-1 whitespace-normal hover:bg-transparent border border-gray-500 ${
          wouldTakeAgain ? "text-green-500 border-green-500" : "text-gray-600"
        }`}
      >
        {textConstants.wouldTakeAgainText}
      </Button>
      <Button
        onClick={() => setWouldTakeAgain(false)}
        className={`bg-transparent w-36 h-24 whitespace-normal hover:bg-transparent border border-gray-500 ${
          wouldTakeAgain ? "text-gray-500" : "text-red-500 border-red-500"
        }`}
      >
        {textConstants.wouldNotTakeAgainText}
      </Button>
    </div>
  );
};

export default CreateReviewWouldTakeAgain;
