import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import CreateReviewTextField from "./CreateReviewTextField.tsx";
import CreateReviewRating from "./CreateReviewRating.tsx";
import CreateReviewDifficulty from "./CreateReviewDifficulty.tsx";
import CreateReviewWouldTakeAgain from "./CreateReviewWouldTakeAgain.tsx";
import CreateReviewObtainedGrade from "./CreateReviewObtainedGrade.tsx";
import CreateReviewCourses from "./CreateReviewCourses.tsx";
import CreateReviewPeriods from "./CreateReviewPeriods.tsx";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CreatedReview } from "../../utils/types.ts";
import type { Period, Course } from "../../utils/types.ts";
import { fetchAllPeriods } from "../../services/periodService.ts";
import { fetchProfessorCourses } from "../../services/professorService.ts";
import { postReview } from "../../services/reviewService.ts";
import { compareCourses, comparePeriods } from "../../utils/comparisons.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.tsx";
import { Button } from "../ui/button.tsx";

interface CreateReviewProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  professor: { name: string; id: string };
}

const CreateReview = ({ open, setOpen, professor }: CreateReviewProps) => {
  const intl = useIntl();
  const authHeader = useAuthHeader();
  const textConstants = {
    writeAReviewFor: intl.formatMessage({ id: "writeAReviewFor" }),
    submitReviewText: intl.formatMessage({ id: "submitReviewText" }),
  };

  const [reviewText, setReviewText] = useState("");
  const [professorRating, setProfessorRating] = useState(1);
  const [wouldTakeAgain, setWouldTakeAgain] = useState(false);
  const [difficultyRating, setDifficultyRating] = useState(1);
  const [obtainedGrade, setObtainedGrade] = useState(2.5);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);

  const [showTextFieldError, setShowTextFieldError] = useState(false);
  const [showCourseError, setShowCourseError] = useState(false);
  const [showPeriodError, setShowPeriodError] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);

  useEffect(() => {
    async function fetchData() {
      const courses: Course[] = await fetchProfessorCourses(professor.id);
      courses.sort(compareCourses);
      setCourses(courses);

      const periods: Period[] = await fetchAllPeriods();
      periods.sort(comparePeriods);
      setPeriods(periods);
    }

    if (professor.id) {
      fetchData();
    }
  }, [professor.id]);

  const isThereFormErrors = () => {
    return showTextFieldError || showCourseError || showPeriodError;
  };

  const createReviewObject = (professor: { id: string }) => {
    return {
      course: selectedCourse!.id,
      code: selectedCourse!.code,
      period: selectedPeriod!.id,
      review: reviewText,
      generalRating: professorRating,
      difficultyLevel: difficultyRating,
      courseGrade: obtainedGrade,
      wouldEnrollAgain: wouldTakeAgain,
      professorId: professor.id,
    };
  };
  const handleReviewSubmit = async () => {
    if (!selectedCourse || !selectedPeriod) {
      setShowCourseError(!selectedCourse);
      setShowPeriodError(!selectedPeriod);
      return;
    }

    const reviewObject: CreatedReview = createReviewObject(professor);

    if (authHeader) {
      postReview(reviewObject, authHeader);
    } else {
      console.error("User tried to post a review, but user is not logged in?");
    }

    if (!isThereFormErrors()) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${textConstants.writeAReviewFor} ${professor.name}`}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between">
          <CreateReviewTextField
            reviewText={reviewText}
            setReviewText={setReviewText}
            showError={showTextFieldError}
            setShowError={setShowTextFieldError}
          />
          <CreateReviewRating
            professorRating={professorRating}
            setProfessorRating={setProfessorRating}
          />
          <CreateReviewDifficulty
            difficultyRating={difficultyRating}
            setDifficultyRating={setDifficultyRating}
          />
          <CreateReviewWouldTakeAgain
            wouldTakeAgain={wouldTakeAgain}
            setWouldTakeAgain={setWouldTakeAgain}
          />
          <CreateReviewObtainedGrade
            obtainedGrade={obtainedGrade}
            setObtainedGrade={setObtainedGrade}
          />
          <CreateReviewCourses
            courses={courses}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            showError={showCourseError}
            setShowError={setShowCourseError}
          />
          <CreateReviewPeriods
            periods={periods}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            showError={showPeriodError}
            setShowError={setShowPeriodError}
          />
          <Button
            onClick={handleReviewSubmit}
            className="bg-primary hover:bg-black"
          >
            {textConstants.submitReviewText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReview;
