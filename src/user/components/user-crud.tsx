import React from 'react';
import {
  Crud,
  CrudCreate,
  CrudEdit,
  CrudIndex,
  CrudIndexListDataGrid,
} from '~/1st-react-crud';
import { AppContainer, AppLayout } from '~/app';
import { useUserService } from '../di';

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
                <CrudIndexListDataGrid
                  columns={[
                    {
                      field: 'id',
                      headerName: '№',
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
                  ]}
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
