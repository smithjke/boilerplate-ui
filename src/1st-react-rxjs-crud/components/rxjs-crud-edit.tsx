import React from 'react';
import { useParams } from 'react-router-dom';
import { RxjsCrudService } from '../services';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { AsyncData } from '~/1st-core';

export type RxjsCrudEditProps = {
  rxjsCrudService: RxjsCrudService;
  children: (asyncData: AsyncData<any>) => React.ReactNode;
};

export const RxjsCrudEdit: React.FC<RxjsCrudEditProps> = (props) => {
  const params = useParams();
  const asyncData = useBehaviorSubject(props.rxjsCrudService.cachedGet(params.id), [params.id]);

  return (
    <>
      {props.children(asyncData)}
    </>
  );
};
