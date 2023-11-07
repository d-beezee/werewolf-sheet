import Inputable from "@src/components/Sheet/Inputable";
import Sheet from "@src/database/Sheet";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

const CustomInputable = styled(Inputable)`
  span {
    min-width: 25%;
  }
`;

const Chronicle = ({ sheet }: { sheet: Sheet }) => {
  const { t } = useTranslation();
  const data = sheet.get();
  if (data === null) return null;

  return (
    <CustomInputable
      title={t("Chronicle", { context: "sheet" })}
      value={data.chronicle || ""}
      onChange={(e) => sheet.setChronicle(e.target.value)}
    />
  );
};

export default Chronicle;
