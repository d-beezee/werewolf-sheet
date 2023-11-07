import Sheet from "@src/database/Sheet";
import { useTranslation } from "react-i18next";
import Damageable from "../Damageable";

const Health = ({ sheet }: { sheet: Sheet }) => {
  const { t } = useTranslation();
  const data = sheet.get();
  if (data === null) return null;

  return (
    <Damageable
      title={t("Health", { context: "sheet" })}
      max={sheet.maxHealth}
      getDamageable={() => data.health}
      saveDamageable={(value) => sheet.setHealth(value)}
    />
  );
};

export default Health;
