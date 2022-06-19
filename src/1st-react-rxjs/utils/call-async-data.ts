import { Subject } from 'rxjs';
import {
  AsyncData,
  makeAsyncData,
  makeErrorAsyncData,
  makeLoadingAsyncData,
} from '~/1st-core';

export function callAsyncData<DATA>(promise: Promise<DATA>, subject$: Subject<AsyncData<DATA>>): void {
  subject$.next(makeLoadingAsyncData());
  promise
    .then((data) => subject$.next(makeAsyncData(data)))
    .catch((error) => subject$.next(makeErrorAsyncData(error)));
}
