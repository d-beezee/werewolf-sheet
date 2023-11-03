import { useEffect, useState } from "react";
import { styled } from "styled-components";

const DottableComponent = ({
  title,
  saveValue,
  getValue,
  className,
}: {
  className?: string;
  title: string;
  getValue: () => number;
  saveValue: (value: number) => void;
}) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(getValue());
  }, []);
  useEffect(() => {
    if (value === 0) return;
    saveValue(value);
  }, [value]);

  return (
    <div className={className}>
      <div className="title">{title}</div>
      <div className="buttons">
        {[...Array(value)].map((_, i) => (
          <button className="filled" onClick={() => setValue(i + 1)}></button>
        ))}
        {[...Array(5 - value)].map((_, i) => (
          <button
            className="empty"
            onClick={() => setValue(i + 1 + value)}
          ></button>
        ))}
      </div>
    </div>
  );
};

const Dottable = styled(DottableComponent)`
  width: 100%;
  margin-bottom: 14px;
  display: flex;
  .title {
    display: inline-block;
    min-width: 45%;
  }
  .buttons {
    display: inline-flex;
    width: 100%;
    button {
      width: 20px;
      height: 20px;
      padding: 0;
      margin: 0;
      border-radius: 50%;
      border: 1px solid black;
      background-color: transparent;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 5px;
      }
      &:hover,
      &.filled {
        background-color: black;
        color: white;
      }
    }
  }
`;
export default Dottable;
