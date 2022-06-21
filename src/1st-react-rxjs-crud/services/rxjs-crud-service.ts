import { BehaviorSubject } from 'rxjs';
import { AsyncData } from '~/1st-core';
import { ApiListParams, ApiListResult } from '~/1st-api';

export interface RxjsCrudService<DATA_TYPE = any> {
  cachedCreate(partialData: Partial<DATA_TYPE>): Promise<Partial<DATA_TYPE>>;

  cachedUpdate(partialData: Partial<DATA_TYPE>, id: string): Promise<Partial<DATA_TYPE>>;

  cachedGet(id: string): BehaviorSubject<AsyncData<Partial<DATA_TYPE>>>;

  cachedList(query: ApiListParams['query']): BehaviorSubject<AsyncData<ApiListResult<Partial<DATA_TYPE>>>>;

  refreshItems(): void;

  refreshLists(): void;

  refresh(): void;
}
