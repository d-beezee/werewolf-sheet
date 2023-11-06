import { useEffect, useState } from "react";
import styled from "styled-components";

class ChangeEvent extends Event {
  private _value: string;

  constructor(value: string) {
    super("change", { bubbles: true });
    this._value = value;
    Object.defineProperty(this, "target", {
      writable: false,
      value: { value },
    });
  }

  get target() {
    return {
      value: this._value,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
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
  onChange: (e: ChangeEvent) => void;
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
  box-sizing: border-box;
  height: 100%;
  span {
    ${({ title }) => (title ? `min-width: 10%;` : ``)}
  }
  input,
  textarea {
    background: none;
    border: none;
    height: 100%;
  }
  input {
    padding: 0.5rem;
    margin-left: 0.5rem;
    ${({ title }) => (title ? `width: 90%;` : `max-width: 100%;`)}
  }
  textarea {
    width: 100%;
  }
`;

export default Inputable;
