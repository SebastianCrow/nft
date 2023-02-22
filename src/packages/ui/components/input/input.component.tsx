import type { ChangeEvent, FunctionComponent } from 'react';
import { useCallback } from 'react';
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
          'text dark:text-dark bg-highlight dark:bg-dark-highlight',
          'placeholder:text-secondary dark:placeholder:text-dark-secondary',
          'focus:outline focus:dark:outline-dark'
        )}
        data-testid="input-main"
      />
      <div
        onClick={clearValue}
        className={classes(
          'group',
          'absolute top-1/2 -translate-y-1/2 right-0',
          'w-10 h-10',
          'mx-1',
          'flex justify-center items-center',
          'cursor-pointer',
          !value ? 'pointer-events-none' : undefined
        )}
        data-testid="input-icon-container"
      >
        {!value && (
          <MagnifyingGlassIcon
            className={classes(
              'w-6',
              'transition-colors',
              'text-secondary dark:text-dark'
            )}
            data-testid="input-icon-search"
          />
        )}
        {value && (
          <XMarkIcon
            className={classes(
              'w-7',
              'transition-colors',
              'text dark:text-dark',
              'group-hover:text-secondary dark:group-hover:text-dark-secondary'
            )}
            data-testid="input-icon-clear"
          />
        )}
      </div>
    </div>
  );
};
