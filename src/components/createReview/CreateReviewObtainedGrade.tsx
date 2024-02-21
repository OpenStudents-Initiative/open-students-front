import { useIntl } from "react-intl";
import { Slider } from "../ui/slider";
import { useEffect, useState } from "react";

interface CreateReviewObtainedGradeProps {
  obtainedGrade: number;
  setObtainedGrade: (value: number) => void;
}
const CreateReviewObtainedGrade = ({
  obtainedGrade,
  setObtainedGrade,
}: CreateReviewObtainedGradeProps) => {
  const intl = useIntl();
  const textConstants = {
    minimumGradeError: intl.formatMessage({ id: "minimumGradeError" }),
    obtainedGradeText: intl.formatMessage({ id: "obtainedGradeText" }),
  };
  const handleSliderChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setObtainedGrade(newValue);
  };

  const [trackThumbColor, setTrackThumbColor] = useState("");

  useEffect(() => {
    if (obtainedGrade < 3) {
      setTrackThumbColor("red");
    } else if (obtainedGrade < 3.75) {
      setTrackThumbColor("yellow");
    } else {
      setTrackThumbColor("green");
    }
  }, [obtainedGrade]);

  return (
    <div className="mb-2">
      <Slider
        value={[obtainedGrade]}
        defaultValue={[2.5]}
        min={1.5}
        max={5}
        step={0.01}
        onValueChange={handleSliderChange}
        classNameTrack={`bg-${trackThumbColor}-500 transition-colors duration-500`}
        classNameThumb={`border-${trackThumbColor}-500 transition-colors duration-500`}
      />
      <span>{`${textConstants.obtainedGradeText}: ${obtainedGrade}`}</span>
    </div>
  );
};

export default CreateReviewObtainedGrade;
