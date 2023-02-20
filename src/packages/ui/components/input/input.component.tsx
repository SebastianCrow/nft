import { ChangeEvent, FunctionComponent, useCallback } from 'react';

interface InputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const Input: FunctionComponent<InputProps> = ({
  value,
  onValueChange,
  placeholder,
}) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onValueChange(event.target.value);
    },
    [onValueChange]
  );

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="py-3 px-6 rounded-lg bg-highlight placeholder:text-secondary"
    />
  );
};
