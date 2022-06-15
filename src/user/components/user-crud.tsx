import React from 'react';
import {
  Crud,
  CrudEdit,
  CrudIndex,
  CrudIndexListDataGrid,
} from '~/1st-react-crud';
import { useUserService } from '~/user';
import { CrudCreate } from '~/1st-react-crud/components/crud-create';

export const UserCrud: React.FC = () => {
  const userService = useUserService();

  return (
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
                  headerName: 'password',
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
  );
};
