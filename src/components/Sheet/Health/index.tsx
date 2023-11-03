import Sheet from "@src/database/Sheet";
import Damageable from "../Damageable";

const Health = ({ sheet }: { sheet: Sheet }) => {
  const data = sheet.get();
  if (data === null) return null;

  return (
    <Damageable
      title="Health"
      max={sheet.maxHealth}
      getDamageable={() => data.health}
      saveDamageable={(value) => sheet.setHealth(value)}
    />
  );
};

export default Health;
