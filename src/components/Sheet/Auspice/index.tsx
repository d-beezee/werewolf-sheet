import Sheet from "@src/database/Sheet";

const Auspice = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;
  return (
    <>
      Auspice
      <select
        defaultValue={data.auspice || "none"}
        onChange={(e) => sheet.setAuspice(e.target.value)}
      >
        <option value="none" disabled>
          Select an auspice
        </option>
        <option value="ahroun">Ahroun</option>
        <option value="galliard">Galliard</option>
        <option value="philodox">Philodox</option>
        <option value="ragabash">Ragabash</option>
        <option value="theurge">Theurge</option>
      </select>
    </>
  );
};

export default Auspice;
