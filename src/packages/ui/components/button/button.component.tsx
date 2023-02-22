import type { FunctionComponent, PropsWithChildren } from 'react';
import { classes } from '../../../../shared';

interface ButtonProps {
  onClick: () => void;
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={classes(
        'py-3 px-6 rounded-xl',
        'transition',
        'text-action',
        'bg-action dark:bg-dark-action',
        'hover:bg-action/90 dark:hover:bg-dark-action/90'
      )}
    >
      {children}
    </button>
  );
};
