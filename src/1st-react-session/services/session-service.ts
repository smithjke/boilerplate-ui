import { BehaviorSubject } from 'rxjs';
import { StorageRepository, useStorageRepository } from '~/1st-core';

type CurrentData<DATA> = {
  data: DATA;
  error: string;
  loading: boolean;
};

export abstract class SessionService<SESSION_DATA = object> {
  private storageRepository: StorageRepository;

  protected tokenSaveEnable = true;

  protected storageKey = 'SESSION_TOKEN';

  currentToken$: BehaviorSubject<CurrentData<string>>;

  currentSessionData$: BehaviorSubject<CurrentData<SESSION_DATA>>;

  constructor() {
    this.storageRepository = useStorageRepository();

    this.currentToken$ = new BehaviorSubject({
      data: this.storageRepository.getItem(this.storageKey),
      error: null,
      loading: false,
    });

    this.currentSessionData$ = new BehaviorSubject({
      data: null,
      error: null,
      loading: false,
    });

    this.currentToken$.subscribe((token) => {
      if (token.data) {
        if (this.tokenSaveEnable) {
          this.storageRepository.setItem(this.storageKey, token.data);
        }
        this.loadData(token.data);
      } else {
        this.currentSessionData$.next({
          data: null,
          error: null,
          loading: false,
        });
      }
    });
  }

  abstract loadData(token: string): void;

  abstract login(name: string, password: string): void;

  abstract logout(): void;
}
