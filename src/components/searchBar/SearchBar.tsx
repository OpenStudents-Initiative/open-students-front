import { useEffect, useState } from "react";
import "../../styles/SearchBar.css";
import { useIntl } from "react-intl";
import levensthein from "js-levenshtein";
import { fetchProfessorsWithKeys } from "../../services/professorService";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface SearchBarProps {
  results: Array<{ name: string; id: string }>;
  setResults: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }[]>
  >;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ results, setResults, setShowResults }: SearchBarProps) => {
  const intl = useIntl();
  const searchProfessors = intl.formatMessage({ id: "searchProfessors" });

  const [professorNames, setProfessorNames] = useState<
    { name: string; id: string }[]
  >([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchAndSetProfessorNames(setProfessorNames);
  }, []);

  useEffect(() => {
    if (!input) {
      setResults([]);
      return;
    }

    const profs = professorNamesToStrList(input, professorNames);
    setResults(profs);

    setShowResults(results && results.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <Card className="w-1/3 flex p-2">
      <Input
        className="w-1/ h-6"
        placeholder={searchProfessors}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
      />
    </Card>
  );
};

export default SearchBar;

async function fetchAndSetProfessorNames(
  setProfessorNames: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }[]>
  >
) {
  const professorNames = await fetchProfessorsWithKeys(["name", "id"]);
  setProfessorNames(professorNames);
}

function professorNamesToStrList(
  input: string,
  professorNames: { name: string; id: string }[]
) {
  const sortedProfNames: { name: string; id: string }[] = professorNames
    .map((value) => {
      const normalizedName = value.name.normalize();
      return {
        name: normalizedName,
        id: value.id,
        // Levensthein distance is biased towards string length, this
        // should normalize the distance and reduce this bias
        score: levensthein(normalizedName, input) / normalizedName.length,
      };
    })
    .sort((a, b) => a.score - b.score)
    .map((value) => {
      console.log(value);
      return { name: value.name, id: value.id };
    })
    .slice(0, 5);

  return sortedProfNames;
}
