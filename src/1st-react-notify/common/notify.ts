import React from 'react';

export type NotifyType = 'error' | 'warning' | 'info' | 'success';

export type Notify = {
  id: string;
  type: NotifyType;
  title?: string;
  body?: React.ReactNode;
};
