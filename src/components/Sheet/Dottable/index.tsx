import { useEffect, useState } from "react";
import { styled } from "styled-components";

const DottableComponent = ({
  title,
  saveValue,
  getValue,
  allowZero = false,
  className,
  children,
}: {
  className?: string;
  title: string;
  allowZero?: boolean;
  getValue: () => number;
  saveValue: (value: number) => void;
  children?: React.ReactNode;
}) => {
  const [value, setValue] = useState(-1);
  useEffect(() => {
    setValue(getValue());
  }, []);
  useEffect(() => {
    if (value === -1) return;
    saveValue(value);
  }, [value]);

  if (value === -1) return null;
  return (
    <div className={className}>
      <div className="title">{title}</div>
      {children}
      <div className="buttons">
        {[...Array(value)].map((_, i) => (
          <button
            className="filled"
            key={i}
            onClick={() =>
              i === 0 && value === 1 && allowZero
                ? setValue(0)
                : setValue(i + 1)
            }
          ></button>
        ))}
        {[...Array(5 - value)].map((_, i) => (
          <button
            className="empty"
            key={i}
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
