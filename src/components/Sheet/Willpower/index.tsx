import Sheet from "@src/database/Sheet";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Damageable from "../Damageable";

const CustomDamageable = styled(Damageable)`
  .title {
    min-width: 32%;
  }
`;

const Willpower = ({ sheet }: { sheet: Sheet }) => {
  const { t } = useTranslation();
  const data = sheet.get();
  if (data === null) return null;

  return (
    <CustomDamageable
      title={t("Willpower", { context: "sheet" })}
      max={sheet.maxWillpower}
      getDamageable={() => data.willpower}
      saveDamageable={(value) => sheet.setWillpower(value)}
    />
  );
};

export default Willpower;
