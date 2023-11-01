import Sheet from "@src/database/Sheet";

const Name = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;
  return (
    <>
      Name
      <input
        defaultValue={data.name}
        onChange={(e) => sheet.setName(e.target.value)}
      />
    </>
  );
};

export default Name;
