import { useEffect, useState } from "react";

interface ModifyRatingProps {
  value: number;
  setValue: (value: number) => void;
}

const ModifyRating: React.FC<ModifyRatingProps> = ({ value, setValue }) => {
  const [uiValue, setUiValue] = useState<number>(value - 1);
  const [fullStars, setFullStars] = useState<boolean[]>(
    createBooleanArray(value - 1),
  );

  useEffect(() => {
    setFullStars(createBooleanArray(uiValue));
  }, [uiValue]);

  return (
    <div className="flex">
      {fullStars.map((full, i) => (
        <svg
          key={`star-${i}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`w-8 h-8 -translate-x-1 cursor-pointer ${
            full ? "text-yellow-500" : "text-gray-300"
          }`}
          onMouseOver={() => setUiValue(i)}
          onMouseOut={() => setUiValue(value - 1)}
          onClick={() => setValue(i + 1)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const createBooleanArray = (index: number) => {
  const booleanArray = [];
  for (let i = 0; i < 5; i++) {
    booleanArray.push(i <= index);
  }
  return booleanArray;
};

export default ModifyRating;
