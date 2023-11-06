import { useEffect, useState } from "react";
import styled from "styled-components";

class ChangeEvent extends Event {
  constructor(value: string) {
    super("change", { bubbles: true });
    Object.defineProperty(this, "target", {
      writable: false,
      value: { value },
    });
  }
}

const InputableComponent = ({
  value,
  onChange,
  title,
  className,
  type = "text",
}: {
  value: string;
  onChange: (e: Event) => void;
  title?: string;
  className?: string;
  type?: "text" | "textarea";
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedInputValue, setDebouncedInputValue] = useState(value);

  useEffect(() => {
    if (onChange && debouncedInputValue !== value) {
      const event = new ChangeEvent(debouncedInputValue);
      onChange(event);
    }
  }, [debouncedInputValue, value]);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, 500]);

  return (
    <div className={className}>
      {title && <span>{title}</span>}
      {type === "textarea" && (
        <textarea
          name={className}
          defaultValue={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      )}
      {type === "text" && (
        <input
          name={className}
          defaultValue={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      )}
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
