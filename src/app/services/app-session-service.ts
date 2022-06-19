import { skip } from 'rxjs';
import { useStorageRepository } from '~/1st-core';
import { SessionService } from '~/1st-react-session';
import { useNotifyService } from '~/1st-react-notify';
import { callAsyncData } from '~/1st-react-rxjs';
import { AuthInitResult } from '~/api';
import { appConfig } from '../common';
import { useApi } from '../api';

export class AppSessionService extends SessionService<AuthInitResult> {
  private notifyService = useNotifyService();

  constructor() {
    super(
      useStorageRepository(),
      appConfig.session.tokenSaveEnable,
      appConfig.session.storageKey,
    );

    this.currentToken$.pipe(skip(1)).subscribe((currentToken) => {
      if (currentToken.error) {
        this.notifyService.push({
          type: 'error',
          title: 'Auth error',
          body: 'Incorrect login data',
        });
      } else if (currentToken.data) {
        this.notifyService.push({
          type: 'success',
          title: 'Auth',
          body: 'Success',
        });
      }
    });
  }

  loadData(token: string): void {
    callAsyncData(
      useApi().auth.init({
        token,
      }),
      this.currentSessionData$,
    );
  }

  login(login: string, password: string): void {
    callAsyncData(
      useApi().auth.login({
        data: {
          login,
          password,
        },
      }),
      this.currentToken$,
    );
  }

  logout(): void {
    console.log('AppSessionService logout');
  }
}
