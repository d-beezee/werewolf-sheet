import Xcontent from "@src/components/Styles/Xcontent";
import styled from "styled-components";
import Dottable from "../Dottable";

const HaugloskComponent = ({
  getValue,
  saveValue,
  className,
}: {
  getValue: () => number;
  saveValue: (value: number) => void;
  className?: string;
}) => {
  return (
    <Dottable
      className={className}
      title="Hauglosk"
      getValue={getValue}
      saveValue={saveValue}
      allowZero
    />
  );
};

const Hauglosk = styled(HaugloskComponent)`
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

export default Hauglosk;
