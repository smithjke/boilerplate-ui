import { BehaviorSubject } from 'rxjs';
import { AsyncData, makeAsyncData, StorageRepository } from '~/1st-core';

export abstract class SessionService<SESSION_DATA = object> {
  private storageRepository: StorageRepository;

  protected tokenSaveEnable: boolean;

  protected storageKey: string;

  currentToken$: BehaviorSubject<AsyncData<string>>;

  currentSessionData$: BehaviorSubject<AsyncData<SESSION_DATA>>;

  protected constructor(
    storageRepository: StorageRepository,
    tokenSaveEnable: boolean,
    storageKey: string,
  ) {
    this.storageRepository = storageRepository;
    this.tokenSaveEnable = tokenSaveEnable;
    this.storageKey = storageKey;
    this.currentToken$ = new BehaviorSubject(makeAsyncData(this.storageRepository.getItem(this.storageKey)));
    this.currentSessionData$ = new BehaviorSubject(makeAsyncData(null));

    this.currentToken$.subscribe((token) => {
      if (token.data) {
        if (this.tokenSaveEnable) {
          this.storageRepository.setItem(this.storageKey, token.data);
        }
        this.loadData(token.data);
      } else {
        if (this.tokenSaveEnable) {
          this.storageRepository.removeItem(this.storageKey);
        }
        this.currentSessionData$.next(makeAsyncData(null));
      }
    });
  }

  abstract loadData(token: string): void;

  abstract login(name: string, password: string): void;

  abstract logout(): void;
}
