import { BehaviorSubject } from 'rxjs';
import { AsyncData } from '~/1st-core';
import { ApiListQuery, ApiListResult } from '~/1st-api';

export interface RxjsCrudService<DATA_TYPE = any> {
  cachedCreate(partialData: DATA_TYPE): Promise<DATA_TYPE>;

  cachedUpdate(partialData: DATA_TYPE, id: string): Promise<DATA_TYPE>;

  cachedGet(id: string): BehaviorSubject<AsyncData<DATA_TYPE>>;

  cachedList(query: ApiListQuery): BehaviorSubject<AsyncData<ApiListResult<DATA_TYPE>>>;

  refreshItems(): void;

  refreshLists(): void;

  refresh(): void;
}
