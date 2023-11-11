import { useEffect, useState } from "react";
import { styled } from "styled-components";

const DottableComponent = ({
  title,
  saveValue,
  value,
  allowZero = false,
  className,
  children,
}: {
  className?: string;
  title: string;
  allowZero?: boolean;
  value: number;
  saveValue: (value: number) => void;
  children?: React.ReactNode;
}) => {
  const [_value, setValue] = useState(-1);
  useEffect(() => {
    setValue(value);
  }, [value]);
  useEffect(() => {
    if (_value === -1) return;
    saveValue(_value);
  }, [_value]);

  if (_value === -1) return null;
  return (
    <div className={className}>
      <div className="title">{title}</div>
      {children}
      <div className="buttons">
        {[...Array(_value || 0)].map((_, i) => (
          <button
            className="filled"
            key={i}
            onClick={() =>
              i === 0 && _value === 1 && allowZero
                ? setValue(0)
                : setValue(i + 1)
            }
          ></button>
        ))}
        {[...Array(5 - _value || 0)].map((_, i) => (
          <button
            className="empty"
            key={i}
            onClick={() => setValue(i + 1 + _value || 0)}
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
