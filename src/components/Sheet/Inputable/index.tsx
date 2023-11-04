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
  title?: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      {title && <span>{title}</span>}
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
    ${({ title }) => (title ? `min-width: 10%;` : ``)}
  }
  input {
    background: none;
    padding: 0.5rem;
    margin-left: 0.5rem;
    border: none;
    ${({ title }) => (title ? `width: 90%;` : `max-width: 100%;`)}
  }
`;

export default Inputable;
