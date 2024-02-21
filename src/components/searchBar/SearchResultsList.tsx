import { SetterOrUpdater } from "recoil";
import "../../styles/SearchResultsList.css";
import { SearchResult } from "./SearchResult";

interface SearchResultsListProps {
  results: Array<{ name: string; id: string }>;
  setCurrentProfessorId: SetterOrUpdater<string>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchResultsList = ({
  results,
  setCurrentProfessorId,
  setShowResults,
}: SearchResultsListProps) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="bg-background rounded-md absolute top-20 left-1/2 transform -translate-x-1/2 max-w-screen-lg min-w-96 border border-primary">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result}
            key={id}
            setCurrentProfessorId={setCurrentProfessorId}
            setShowResults={setShowResults}
          />
        );
      })}
    </div>
  );
};
