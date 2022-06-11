import { BehaviorSubject } from 'rxjs';
import { useObservable } from './use-observable';

export function useBehaviorSubject<T>(behaviorSubject$: BehaviorSubject<T>, deps?: any): T {
  return useObservable(behaviorSubject$, behaviorSubject$.value, deps);
}
