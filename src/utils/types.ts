export interface UserSessionData {
  uuid: string;
  name: string;
  email: string;
}

export interface Professor {
  name: string;
  university: string;
  dependency: string;
  averageRating: number;
  averageCourseGrade: number;
  averageDifficultyLevel: number;
}

export interface Review {
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

export interface CreatedReview {
  course: string;
  code: string;
  period: string;
  review: string;
  generalRating: number;
  difficultyLevel: number;
  courseGrade: number;
  wouldEnrollAgain: boolean;
  professorId: string;
}

export interface Period {
  name: string;
  id: string;
}

export interface Course {
  id: string;
  professorId: string;
  code: string;
  courseName: string;
}
