import Sheet from "@src/database/Sheet";
import Inputable from "../Inputable";

const Patron = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;
  return (
    <Inputable
      title="Patron"
      value={data.patron || ""}
      onChange={(e) => sheet.setPatron(e.target.value)}
    />
  );
};

export default Patron;
