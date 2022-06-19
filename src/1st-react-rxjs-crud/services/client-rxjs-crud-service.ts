import { BehaviorSubject } from 'rxjs';
import { AsyncData, makeLoadingAsyncData } from '~/1st-core';
import { ApiListParams, ApiListResult } from '~/1st-api';
import { ClientCrudService } from '~/1st-crud';
import { RxjsCrudService } from '~/1st-react-rxjs-crud';
import { callAsyncData } from '~/1st-react-rxjs';

export abstract class ClientRxjsCrudService<DATA_TYPE> extends ClientCrudService<DATA_TYPE> implements RxjsCrudService {
  private behaviorSubjects: Record<string, BehaviorSubject<AsyncData<ApiListResult<DATA_TYPE>>>> = {};

  cachedList(query: ApiListParams['query']): BehaviorSubject<AsyncData<ApiListResult<DATA_TYPE>>> {
    const queryKey = JSON.stringify(query);

    if (this.behaviorSubjects[queryKey]) {
      return this.behaviorSubjects[queryKey];
    }

    this.behaviorSubjects[queryKey] = new BehaviorSubject(makeLoadingAsyncData());

    callAsyncData(this.list(query), this.behaviorSubjects[queryKey]);

    return this.behaviorSubjects[queryKey];
  }
}
