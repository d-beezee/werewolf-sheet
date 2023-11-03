import Sheet from "@src/database/Sheet";
import Inputable from "../Inputable";

const Name = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;
  return (
    <Inputable
      title="Name"
      value={data.name || ""}
      onChange={(e) => sheet.setName(e.target.value)}
    />
  );
};

export default Name;
