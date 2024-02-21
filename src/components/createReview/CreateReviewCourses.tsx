import React, { memo, useEffect } from "react";
import { useIntl } from "react-intl";
import { Course } from "../../utils/types";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CreateReviewCoursesProps {
  selectedCourse: Course | null;
  setSelectedCourse: (value: Course) => void;
  courses: Course[];
  showError: boolean;
  setShowError: (value: boolean) => void;
}

const CreateReviewCourses: React.FC<CreateReviewCoursesProps> = memo(
  ({ selectedCourse, setSelectedCourse, courses, showError, setShowError }) => {
    const intl = useIntl();
    const courseMap = new Map<string, Course>();

    useEffect(() => {
      courseMap.clear();
      courses.forEach((course) => {
        courseMap.set(course.courseName, course);
      });
    });

    const textConstants = {
      courseNotSelectedError: intl.formatMessage({
        id: "courseNotSelectedError",
      }),
      selectClassText: intl.formatMessage({ id: "selectClassText" }),
    };

    const handleSelectChange = (selectedCourse: string) => {
      setSelectedCourse(courseMap.get(selectedCourse)!);
      setShowError(selectedCourse === "");
    };

    return (
      <div className="mb-1">
        <span id="selected-period-label">{textConstants.selectClassText}</span>
        <Select
          value={selectedCourse ? selectedCourse.courseName : ""}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={textConstants.selectClassText} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{textConstants.selectClassText}</SelectLabel>
              {courses.map((course, index) => (
                <SelectItem value={course.courseName} key={index}>
                  {course.courseName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {showError && (
          <span className="mt-2 text-red-500">
            {textConstants.courseNotSelectedError}
          </span>
        )}
      </div>
    );
  },
);

export default CreateReviewCourses;
