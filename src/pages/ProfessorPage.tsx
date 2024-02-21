import ProfessorCard from "../components/professorCard/ProfessorCard.tsx";
import ReviewCard from "../components/reviewCard/ReviewCard.tsx";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import CreateReview from "../components/createReview/CreateReview.tsx";
import { currentProfessorIdState } from "../atoms/defaultAtoms.ts";
import { useRecoilValue } from "recoil";
import { Professor, Review } from "../utils/types.ts";
import {
  fetchProfessorById,
  fetchProfessorReviews,
} from "../services/professorService.ts";

export default function ProfessorPage() {
  const intl = useIntl();
  const professorId = useRecoilValue(currentProfessorIdState);
  const textConstants = {
    noReviewsYet: intl.formatMessage({ id: "noReviewsYet" }),
    beTheFirstReview: intl.formatMessage({ id: "beTheFirstReview" }),

    loadingProfessor: intl.formatMessage({ id: "loadingProfessor" }),
    loadingUniversity: intl.formatMessage({ id: "loadingUniversity" }),
    loadingDependency: intl.formatMessage({ id: "loadingDependency" }),
  };

  const [professor, setProfessor] = useState<Professor>({
    name: textConstants.loadingProfessor,
    university: textConstants.loadingUniversity,
    dependency: textConstants.loadingDependency,
    averageRating: 5.0,
    averageCourseGrade: 5.0,
    averageDifficultyLevel: 5.0,
  });

  const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);

  const handleOpenReviewPopup = () => {
    setReviewPopupOpen(true);
  };

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchData() {
      const professor = await fetchProfessorById(professorId);

      if (professor) {
        setProfessor(professor);
      }

      const reviews = await fetchProfessorReviews(professorId);
      const sortedReviews = reviews.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setReviews(sortedReviews);
    }

    if (professorId) fetchData();
  }, [professorId, reviews]);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 p-8">
      <div className="md:w-full lg:w-1/4">
        <ProfessorCard
          professor={professor}
          makeReview={handleOpenReviewPopup}
        />
      </div>
      <div className="flex flex-col md:w-full lg:w-3/4 gap-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-center">
              {textConstants.noReviewsYet}
              <br />
              {textConstants.beTheFirstReview}
            </p>
          </div>
        )}
        <CreateReview
          open={isReviewPopupOpen}
          setOpen={setReviewPopupOpen}
          professor={{ id: professorId, ...professor }}
        />
      </div>
    </div>
  );
}
