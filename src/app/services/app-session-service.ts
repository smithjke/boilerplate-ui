import { SessionService } from '~/1st-react-session';
import { appApi } from '~/app';
import { NotifyType, useNotifyService } from '~/notify';

export class AppSessionService extends SessionService<string> {
  notifyService = useNotifyService();

  loadData(token: string): void {
    this.currentSessionData$.next({
      data: null,
      error: null,
      loading: true,
    });
    setTimeout(() => {
      this.currentSessionData$.next({
        data: `KEK:${token}`,
        error: null,
        loading: false,
      });
    }, 2000);
  }

  login(login: string, password: string): void {
    console.log('AppSessionService login >>>', login, password);
    this.currentToken$.next({
      data: null,
      error: null,
      loading: true,
    });
    setTimeout(() => {
      appApi.auth.login({
        data: {
          login,
          password,
        },
      })
        .then((res) => {
          console.log('login res >>>', res);
          this.currentToken$.next({
            data: res,
            error: null,
            loading: false,
          });
        })
        .catch((err) => {
          console.log('login err >>>', err);
          this.notifyService.push({
            type: NotifyType.FAIL,
            data: 'Incorrect login data',
          });
          this.currentToken$.next({
            data: null,
            error: err.message,
            loading: false,
          });
        });
    }, 2000);
  }

  logout(): void {
    console.log('AppSessionService logout');
  }
}
