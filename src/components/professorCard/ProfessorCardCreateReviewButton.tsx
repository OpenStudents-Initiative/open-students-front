import React from "react";
import { useIntl } from "react-intl";
import { Button } from "../ui/button";

interface Props {
  makeReview: React.MouseEventHandler<HTMLElement>;
}

const ProfessorCardCreateReviewButton = ({ makeReview }: Props) => {
  const intl = useIntl();
  const textConstants = {
    createReviewText: intl.formatMessage({ id: "createReviewText" }),
  };

  return (
    <div className="flex justify-center">
      <Button className="w-full" onClick={makeReview}>
        {textConstants.createReviewText}
      </Button>
    </div>
  );
};

export default ProfessorCardCreateReviewButton;
