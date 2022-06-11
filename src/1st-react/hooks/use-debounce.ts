import { useRef } from 'react';

export function useDebounce<T>(callback: (value: T) => void, ms: number): (value: T) => void {
  const counter = useRef<number>(0);

  return (value: T) => {
    counter.current += 1;
    const { current } = counter;
    setTimeout(() => {
      if (counter.current === current) {
        callback(value);
      }
    }, ms);
  };
}
