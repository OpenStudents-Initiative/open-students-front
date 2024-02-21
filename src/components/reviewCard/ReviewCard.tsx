import React from "react";
import { useIntl } from "react-intl";
import ReviewDifficultyLevel from "./ReviewDifficultyLevel.tsx";
import { Card } from "../ui/card.tsx";
import Rating from "../ui/rating.tsx";

interface Review {
  id: string;
  course: string;
  code: string;
  period: string;
  createdAt: string;
  review: string;
  generalRating: number;
  difficultyLevel: number;
  courseGrade: number;
  wouldEnrollAgain: boolean;
  professorId: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const intl = useIntl();
  const textConstants = {
    wouldEnrollAgainText: intl.formatMessage({ id: "wouldEnrollAgainText" }),
    wouldNotEnrollAgainText: intl.formatMessage({
      id: "wouldNotEnrollAgainText",
    }),
    semesterText: intl.formatMessage({ id: "semesterText" }),
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-left max-w-3/4 font-semibold">
            {`${review.code}: ${review.course}`}
          </p>
          <p className="text-right font-semibold">
            {`${textConstants.semesterText}: ${review.period}`}
          </p>
        </div>
        <ReviewRating value={review.generalRating} />
        <ReviewDifficultyLevel difficultyLevel={review.difficultyLevel} />
      </div>
      <hr className="my-4" />
      <p className="text-left">{review.review}</p>
      <hr className="my-4" />
      <WouldEnrollAgain
        positiveText={textConstants.wouldEnrollAgainText}
        negativeText={textConstants.wouldNotEnrollAgainText}
        value={review.wouldEnrollAgain}
      />
    </Card>
  );
};

export default ReviewCard;

const ReviewRating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2">
    <Rating value={5} />
    {value}
  </div>
);

const WouldEnrollAgain = ({
  positiveText,
  negativeText,
  value,
}: {
  positiveText: string;
  negativeText: string;
  value: boolean;
}) => (
  <div className="flex items-center gap-2">
    <i> {value ? positiveText : negativeText}</i>
  </div>
);
