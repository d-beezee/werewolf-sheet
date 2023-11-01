import Sheet from "@src/database/Sheet";

const Chronicle = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;
  return (
    <>
      Chronicle
      <input
        defaultValue={data.chronicle}
        onChange={(e) => sheet.setChronicle(e.target.value)}
      />
    </>
  );
};

export default Chronicle;
