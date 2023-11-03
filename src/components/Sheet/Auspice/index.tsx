import Selectable from "@src/components/Sheet/Selectable";
import Sheet from "@src/database/Sheet";

const Auspice = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;

  return (
    <Selectable
      title="Auspice"
      value={data.auspice || "none"}
      onChange={(e) => sheet.setAuspice(e.target.value)}
      options={[
        { id: "ahroun", name: "Ahroun" },
        { id: "galliard", name: "Galliard" },
        { id: "philodox", name: "Philodox" },
        { id: "ragabash", name: "Ragabash" },
        { id: "theurge", name: "Theurge" },
      ]}
      noOptions="Select an auspice"
    />
  );
};

export default Auspice;
