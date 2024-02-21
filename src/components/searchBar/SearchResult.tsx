import { SetterOrUpdater } from "recoil";
import "../../styles/SearchResult.css";

interface SearchResultProps {
  result: {
    name: string;
    id: string;
  };
  setCurrentProfessorId: SetterOrUpdater<string>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchResult = ({
  result,
  setCurrentProfessorId,
  setShowResults,
}: SearchResultProps) => {
  return (
    <div
      className="p-4 hover:bg-primary hover:text-background cursor-pointer"
      onClick={() => {
        setCurrentProfessorId(result.id);
        setShowResults(false);
      }}
    >
      {result.name}
    </div>
  );
};
