import { useStorageRepository } from '~/1st-core';
import { AuthClient } from '~/api';
import { appConfig } from '../common';

export class AppAuthClient extends AuthClient {
  protected transformHeaders(headers: HeadersInit): HeadersInit {
    return {
      ...headers,
      ['session-token']: useStorageRepository().getItem(appConfig.session.storageKey),
    };
  }
}
