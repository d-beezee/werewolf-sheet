import Xcontent from "@src/components/Styles/Xcontent";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Dottable from "../Dottable";

const HaranoComponent = ({
  value,
  saveValue,
  className,
}: {
  value: number;
  saveValue: (value: number) => void;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <Dottable
      className={className}
      title={t("Harano", { context: "sheet" })}
      value={value}
      saveValue={saveValue}
      allowZero
    />
  );
};

const Harano = styled(HaranoComponent)`
  .buttons button {
    border-radius: 0;
    &.filled,
    &:hover {
      background-color: transparent;
      &:after {
        ${Xcontent}
      }
    }
  }
`;

export default Harano;
