import { useEffect, useRef } from 'react';

export const useScrollToBottom = (dependencyArray: any) => {
  const scrollRef = useRef<HTMLDivElement>(null); // Typage explicite

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dependencyArray]);

  return scrollRef;
};
