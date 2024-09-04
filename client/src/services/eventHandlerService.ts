import { KeyboardEvent } from 'react';

// Submit input with ENTER
export const handleKeyDown = (
  e: KeyboardEvent,
  onSubmit: (e: KeyboardEvent) => void,
  onCancel?: () => void
) => {
  switch (e.key) {
    case 'Enter':
      if (!e.shiftKey) {
        e.preventDefault();
        onSubmit(e);
      }
      break;

    case 'Escape':
      e.preventDefault();
      onCancel();
      break;

    default:
      break;
  }
};
