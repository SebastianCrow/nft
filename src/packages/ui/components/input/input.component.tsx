import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { classes } from '../../../../shared';

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
      className={classes(
        'py-3 px-6 w-full rounded-lg',
        'transition-colors',
        'focus:outline focus:dark:outline-dark',
        'text dark:text-dark bg-highlight dark:bg-dark-highlight',
        'placeholder:text-secondary dark:placeholder:text-dark-secondary'
      )}
    />
  );
};
