import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
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

  const clearValue = useCallback(() => {
    onValueChange('');
  }, [onValueChange]);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classes(
          'py-3 pl-6 pr-12 w-full rounded-lg',
          'transition-colors',
          'focus:outline focus:dark:outline-dark',
          'text dark:text-dark bg-highlight dark:bg-dark-highlight',
          'placeholder:text-secondary dark:placeholder:text-dark-secondary'
        )}
      />
      <div
        onClick={clearValue}
        className={classes(
          'absolute top-1/2 -translate-y-1/2 right-0',
          'w-10 h-10',
          'mx-1',
          'flex justify-center items-center',
          !value ? 'pointer-events-none' : undefined
        )}
      >
        {!value && (
          <MagnifyingGlassIcon
            className={classes('w-6', 'text-secondary dark:text-dark')}
          />
        )}
        {value && (
          <XMarkIcon
            className={classes(
              'w-7',
              'cursor-pointer',
              'transition-colors',
              'text dark:text-dark',
              'hover:text-secondary dark:hover:text-dark-secondary'
            )}
          />
        )}
      </div>
    </div>
  );
};
