import Sheet from "@src/database/Sheet";

const Patron = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;
  return (
    <>
      Patron
      <input
        defaultValue={data.patron}
        onChange={(e) => sheet.setPatron(e.target.value)}
      />
    </>
  );
};

export default Patron;
