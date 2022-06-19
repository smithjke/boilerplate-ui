import React from 'react';
import {
  Crud,
  CrudCreate,
  CrudEdit,
  CrudIndex,
} from '~/1st-react-crud';
import { RxjsDataGridCrudIndexList } from '~/1st-react-rxjs-crud';
import { AppContainer, AppLayout } from '~/app';
import { useUserService } from '../di';

const userCrudIndexListColumns = [
  {
    field: 'id',
    headerName: '#',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'password',
    headerName: 'Password',
    flex: 1,
  },
];

export const UserCrud: React.FC = () => {
  const userService = useUserService();

  return (
    <AppLayout>
      <AppContainer>
        <Crud
          index={(
            <CrudIndex
              title={'Users'}
              filters={(
                <div>FILTERS</div>
              )}
              list={(
                <RxjsDataGridCrudIndexList
                  columns={userCrudIndexListColumns}
                  crudService={userService}
                />
              )}
            />
          )}
          edit={(
            <CrudEdit
              title={'Users Edit'}
              crudService={userService}
            />
          )}
          create={(
            <CrudCreate
              title={'Users Create'}
              crudService={userService}
            />
          )}
        />
      </AppContainer>
    </AppLayout>
  );
};
