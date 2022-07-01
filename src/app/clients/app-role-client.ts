import { useStorageRepository } from '~/1st-core';
import { RoleRestClient } from '~/api';
import { appConfig } from '../common';

export class AppRoleClient extends RoleRestClient {
  protected transformHeaders(headers: HeadersInit): HeadersInit {
    return {
      ...headers,
      ['session-token']: useStorageRepository().getItem(appConfig.session.storageKey),
    };
  }
}
