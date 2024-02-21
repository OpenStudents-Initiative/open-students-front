import * as React from "react";
import professorAvatar from "../../assets/professorAvatar.png";
import ProfessorCardRatingGradeDifficulty from "./ProfessorCardRatingGradeDifficulty";
import ProfessorCardCreateReviewButton from "./ProfessorCardCreateReviewButton";
import ProfessorCardNameUniversityDependency from "./ProfessorCardNameUniversityDependency";
import { Card, CardContent, CardHeader } from "../ui/card";

interface Professor {
  name: string;
  university: string;
  dependency: string;
  averageRating: number;
  averageCourseGrade: number;
  averageDifficultyLevel: number;
}

interface ProfessorCardProps {
  professor: Professor;
  makeReview: React.MouseEventHandler<HTMLElement>;
}

const ProfessorCard = ({ professor, makeReview }: ProfessorCardProps) => (
  <Card className="text-center">
    <CardHeader>
      <img
        src={professorAvatar}
        alt="professorAvatar"
        className="aspect-square"
      />
    </CardHeader>

    <CardContent>
      <ProfessorCardNameUniversityDependency
        name={professor.name}
        university={professor.university}
        dependency={professor.dependency}
      />
      <ProfessorCardRatingGradeDifficulty
        rating={professor.averageRating}
        grade={professor.averageCourseGrade}
        difficulty={professor.averageDifficultyLevel}
      />
      <ProfessorCardCreateReviewButton makeReview={makeReview} />
    </CardContent>
  </Card>
);

export default ProfessorCard;
