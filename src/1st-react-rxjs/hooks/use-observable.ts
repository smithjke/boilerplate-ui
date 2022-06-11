import { Observable } from 'rxjs';
import { useEffect, useState } from 'react';

export function useObservable<T>(observable$: Observable<T>, defaultValue: T, deps?: any): T {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const subscription = observable$.subscribe((newValue) => setValue(newValue));

    return () => subscription.unsubscribe();
  }, deps || []);

  return value;
}
