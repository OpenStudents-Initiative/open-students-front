interface Props {
  name: string;
  university: string;
  dependency: string;
}

const ProfessorCardNameUniversityDependency = ({
  name,
  university,
  dependency,
}: Props) => {
  return (
    <>
      <h1 className="text-lg font-semibold">{name}</h1>
      <h2 className="text-sm font-semibold">{university}</h2>
      <p className="text-sm font-semibold">{dependency}</p>
    </>
  );
};

export default ProfessorCardNameUniversityDependency;
