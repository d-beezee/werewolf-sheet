import { InputHTMLAttributes, useEffect, useState } from "react";
import { styled } from "styled-components";

const SelectableComponent = ({
  options,
  title,
  noOptions,
  value,
  onChange,
  className,
}: {
  options: { name: string; id: string }[];
  title: string;
  noOptions: string;
  value: string;
  onChange: InputHTMLAttributes<HTMLSelectElement>["onChange"];
  className?: string;
}) => {
  const [_value, setValue] = useState("none");

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div className={className}>
      <span>{title}</span>
      <select
        value={_value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e);
        }}
      >
        <option value="none" disabled>
          {noOptions}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const Selectable = styled(SelectableComponent)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  span {
    min-width: 10%;
  }
  select {
    padding: 0.5rem;
    margin-left: 0.5rem;
    border: none;
    width: 90%;
  }
`;

export default Selectable;
