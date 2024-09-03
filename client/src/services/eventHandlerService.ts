import { KeyboardEvent } from 'react';

// Submit input with ENTER
export const handleEnterKey = (
  e: KeyboardEvent,
  onSubmit: (e: KeyboardEvent) => void
) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    onSubmit(e);
  }
};
