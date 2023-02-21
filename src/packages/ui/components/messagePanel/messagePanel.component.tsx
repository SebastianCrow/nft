import type { FunctionComponent } from 'react';
import { classes } from '../../../../shared';
import { Button } from '../button/button.component';

interface MessagePanelProps {
  title: string;
  message: string;
  onAction?: () => void;
}

export const MessagePanel: FunctionComponent<MessagePanelProps> = ({
  title,
  message,
  onAction,
}) => {
  return (
    <div
      className={classes(
        'flex flex-col items-center',
        'max-w-[500px]',
        'space-y-5',
        'transition-colors',
        'text dark:text-dark'
      )}
    >
      <div className={classes('flex flex-col items-center', 'space-y-2')}>
        <div className="text-3xl">{title}</div>
        <div className="text-secondary dark:text-dark-secondary">{message}</div>
      </div>
      {onAction && <Button onClick={onAction}>Clear search</Button>}
    </div>
  );
};
