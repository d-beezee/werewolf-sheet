import Sheet from "@src/database/Sheet";
import Damageable from "../Damageable";

const Willpower = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;

  return (
    <Damageable
      title="Willpower"
      max={sheet.maxWillpower}
      getDamageable={() => data.willpower}
      saveDamageable={(value) => sheet.setWillpower(value)}
    />
  );
};

export default Willpower;
