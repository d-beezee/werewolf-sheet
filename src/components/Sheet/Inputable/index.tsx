import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const InputableComponent = ({
  value,
  onChange,
  title,
  className,
}: {
  value: string;
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
  title: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <span>{title}</span>
      <input defaultValue={value} onChange={onChange} />
    </div>
  );
};

const Inputable = styled(InputableComponent)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  span {
    min-width: 10%;
  }
  input {
    background: none;
    padding: 0.5rem;
    margin-left: 0.5rem;
    border: none;
    width: 90%;
  }
`;

export default Inputable;
