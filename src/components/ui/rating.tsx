import React from "react";

type RatingProps = {
  value: number; // Expected to be between 0 and 5
};

const Rating: React.FC<RatingProps> = ({ value }) => {
  // Determine the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(value);
  const emptyStars = Math.floor(5 - value);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          className="w-4 h-4 text-yellow-500"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          className="w-4 h-4 text-gray-300"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
