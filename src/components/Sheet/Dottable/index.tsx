import { useEffect, useState } from "react";

const Dottable = ({
  title,
  saveValue,
  getValue,
}: {
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
    <>
      {title}
      {[...Array(value)].map((_, i) => (
        <button onClick={() => setValue(i + 1)}>*</button>
      ))}
      {[...Array(5 - value)].map((_, i) => (
        <button onClick={() => setValue(i + 1 + value)}>O</button>
      ))}
    </>
  );
};

export default Dottable;
