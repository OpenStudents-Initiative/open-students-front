import { Course, Period } from "./types";

export const compareCourses = (course1: Course, course2: Course) =>
  course1.courseName.localeCompare(course2.courseName);

export const comparePeriods = (period1: Period, period2: Period) => {
  // Descending order, prioritizing numbers over strings. E.g: 2023-20, 2023-10, 2022-20, ..., other

  // Extract numeric parts from the strings
  const num1 = parseInt(period1.name, 10) || 0;
  const num2 = parseInt(period2.name, 10) || 0;
  // Compare numeric parts first
  if (num1 !== num2) {
    return num2 - num1;
  }

  // If numeric parts are equal, compare the entire strings
  return period2.name.localeCompare(period1.name);
};
