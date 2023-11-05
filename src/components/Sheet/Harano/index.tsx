import Xcontent from "@src/components/Styles/Xcontent";
import styled from "styled-components";
import Dottable from "../Dottable";

const HaranoComponent = ({
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
      title="Harano"
      getValue={getValue}
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
