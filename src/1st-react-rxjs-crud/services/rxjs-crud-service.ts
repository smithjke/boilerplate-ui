import { BehaviorSubject } from 'rxjs';
import { AsyncData } from '~/1st-core';
import { ApiListParams, ApiListResult } from '~/1st-api';

export interface RxjsCrudService {
  cachedList(query: ApiListParams['query']): BehaviorSubject<AsyncData<ApiListResult<any>>>;
}
