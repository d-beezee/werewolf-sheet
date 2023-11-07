import Xcontent from "@src/components/Styles/Xcontent";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Dottable from "../Dottable";

const RageComponent = ({
  getValue,
  saveValue,
  className,
}: {
  getValue: () => number;
  saveValue: (value: number) => void;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <Dottable
      className={className}
      title={t("Rage", { context: "sheet" })}
      getValue={getValue}
      saveValue={saveValue}
      allowZero
    />
  );
};

const Rage = styled(RageComponent)`
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

export default Rage;
