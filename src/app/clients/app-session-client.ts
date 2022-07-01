import { useStorageRepository } from '~/1st-core';
import { SessionRestClient } from '~/api';
import { appConfig } from '../common';

export class AppSessionClient extends SessionRestClient {
  protected transformHeaders(headers: HeadersInit): HeadersInit {
    return {
      ...headers,
      ['session-token']: useStorageRepository().getItem(appConfig.session.storageKey),
    };
  }
}
