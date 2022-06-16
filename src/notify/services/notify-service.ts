import { BehaviorSubject } from 'rxjs';
import { Notify } from '../common';

const NOTIFY_DEFAULT_DURATION = 5000;

export class NotifyService {
  list$: BehaviorSubject<Array<Notify>> = new BehaviorSubject([]);

  push(notifyPartial: Pick<Notify, 'type' | 'data'>, duration: number = NOTIFY_DEFAULT_DURATION): Notify['id'] {
    const id = String(Math.random());

    this.list$.next([
      ...this.list$.value,
      {
        id,
        ...notifyPartial,
      },
    ]);

    setTimeout(() => this.remove(id), duration);

    return id;
  }

  remove(id: Notify['id']): void {
    const baseList = this.list$.value;
    const newList = baseList.filter((notify) => notify.id !== id);

    if (baseList.length > newList.length) {
      this.list$.next(newList);
    }
  }

  clear(): void {
    this.list$.next([]);
  }
}
