import { BehaviorSubject } from 'rxjs';
import { randomString } from '~/1st-core';
import { Notify } from '../common';

const NOTIFY_DEFAULT_DURATION = 5000;

export class NotifyService {
  private notifyCache: Record<Notify['id'], Notify> = {};

  list$: BehaviorSubject<Array<Notify['id']>> = new BehaviorSubject([]);

  get(id: Notify['id']): Notify {
    return this.notifyCache[id];
  }

  push(notifyPartial: Omit<Notify, 'id'>, duration: number = NOTIFY_DEFAULT_DURATION): Notify['id'] {
    const id = randomString(32);

    this.list$.next([
      ...this.list$.value,
      id,
    ]);

    this.notifyCache[id] = {
      id,
      ...notifyPartial,
    };

    setTimeout(() => this.remove(id), duration);

    return id;
  }

  remove(id: Notify['id']): void {
    const baseList = this.list$.value;
    const newList = baseList.filter((notifyId) => notifyId !== id);

    if (baseList.length > newList.length) {
      this.list$.next(newList);
      delete this.notifyCache[id];
    }
  }

  clear(): void {
    this.list$.next([]);
    this.notifyCache = {};
  }
}
