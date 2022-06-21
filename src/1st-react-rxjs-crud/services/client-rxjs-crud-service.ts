import { BehaviorSubject } from 'rxjs';
import { AsyncData, makeAsyncData, makeLoadingAsyncData } from '~/1st-core';
import { ApiListParams, ApiListResult } from '~/1st-api';
import { ClientCrudService } from '~/1st-crud';
import { callAsyncData } from '~/1st-react-rxjs';
import { RxjsCrudService } from '~/1st-react-rxjs-crud';

export abstract class ClientRxjsCrudService<DATA_TYPE> extends ClientCrudService<DATA_TYPE> implements RxjsCrudService {
  private behaviorSubjectItems: Record<string, BehaviorSubject<AsyncData<Partial<DATA_TYPE>>>> = {};

  private behaviorSubjectLists: Record<string, BehaviorSubject<AsyncData<ApiListResult<Partial<DATA_TYPE>>>>> = {};

  async cachedCreate(partialData: Partial<DATA_TYPE>): Promise<Partial<DATA_TYPE>> {
    const data = await this.create(partialData);
    this.refreshLists();

    return data;
  }

  async cachedUpdate(partialData: Partial<DATA_TYPE>, id: string): Promise<Partial<DATA_TYPE>> {
    const data = await this.update(partialData, id);
    this.behaviorSubjectItems[id].next(makeAsyncData(data));
    this.refreshLists();

    return data;
  }

  cachedGet(id: string): BehaviorSubject<AsyncData<Partial<DATA_TYPE>>> {
    if (!this.behaviorSubjectItems[id]) {
      this.behaviorSubjectItems[id] = new BehaviorSubject(makeLoadingAsyncData());
      callAsyncData(this.get(id), this.behaviorSubjectItems[id]);
    }

    return this.behaviorSubjectItems[id];
  }

  cachedList(query: ApiListParams['query']): BehaviorSubject<AsyncData<ApiListResult<Partial<DATA_TYPE>>>> {
    const queryKey = JSON.stringify(query);

    if (!this.behaviorSubjectLists[queryKey]) {
      this.behaviorSubjectLists[queryKey] = new BehaviorSubject(makeLoadingAsyncData());
      callAsyncData(this.list(query), this.behaviorSubjectLists[queryKey]);
    }

    return this.behaviorSubjectLists[queryKey];
  }

  refreshItems(): void {
    Object.keys(this.behaviorSubjectItems).forEach((id) => {
      if (this.behaviorSubjectItems[id].observed) {
        callAsyncData(this.get(id), this.behaviorSubjectItems[id]);
      } else {
        this.behaviorSubjectItems[id].complete();
        delete this.behaviorSubjectItems[id];
      }
    });
  }

  refreshLists(): void {
    Object.keys(this.behaviorSubjectLists).forEach((queryKey) => {
      if (this.behaviorSubjectLists[queryKey].observed) {
        const query = JSON.parse(queryKey);
        callAsyncData(this.list(query), this.behaviorSubjectLists[queryKey]);
      } else {
        this.behaviorSubjectLists[queryKey].complete();
        delete this.behaviorSubjectLists[queryKey];
      }
    });
  }

  refresh(): void {
    this.refreshItems();
    this.refreshLists();
  }
}
