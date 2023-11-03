import Inputable from "@src/components/Sheet/Inputable";
import Sheet from "@src/database/Sheet";

const Concept = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;

  return (
    <Inputable
      title="Concept"
      value={data.concept || ""}
      onChange={(e) => sheet.setConcept(e.target.value)}
    />
  );
};

export default Concept;
