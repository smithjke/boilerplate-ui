export enum NotifyType {
  SUCCESS,
  FAIL,
}

export type Notify = {
  id: string;
  type: NotifyType;
  data: string | Array<string>;
};
