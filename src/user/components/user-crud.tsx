import React from 'react';
import { Crud, CrudIndex, CrudIndexListDataGrid } from '~/1st-react-crud';
import { useUserService } from '~/user';

export const UserCrud: React.FC = () => {
  const userService = useUserService();

  return (
    <Crud
      index={(
        <CrudIndex
          title={'Users'}
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
      edit={(<div>crud edit</div>)}
      create={<div>crud create</div>}
    />
  );
};
