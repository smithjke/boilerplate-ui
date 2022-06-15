import React, { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from '@mui/x-data-grid';
import { CrudService } from '~/1st-crud';
import { usePromise } from '~/1st-react';
import { ApiListResult } from '~/1st-api';

const defaultRowsPerPageOptions = [10, 20, 50];
const defaultResult: ApiListResult<object> = { list: [], total: 0 };

export type CrudIndexListDataGridProps = {
  columns: GridColumns;
  crudService: CrudService<object>;
};

type SearchData = {
  page?: string;
  size?: string;
};

export const CrudIndexListDataGrid: React.FC<CrudIndexListDataGridProps> = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchData: SearchData = {};

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-restricted-syntax
  for (const a of searchParams.keys()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    searchData[a] = searchParams.get(a);
  }

  const { page = 1, size = defaultRowsPerPageOptions[0], ...otherData } = searchData;

  const setPage = (newPage: number) => setSearchParams({
    ...searchData,
    page: String(newPage + 1),
  });

  const setPageSize = (newPageSize: number) => setSearchParams({
    ...searchData,
    size: String(newPageSize),
  });

  const response = usePromise(() => props.crudService.list({
    ...otherData,
    limit: Number(size),
    skip: (Number(page) - 1) * Number(size),
  }), [searchParams]);

  const { result = defaultResult } = response;

  const getActions = useCallback((params: GridRowParams) => [
    <GridActionsCellItem
      icon={<div>@</div>}
      onClick={() => navigate(`${params.id}`)}
      label={'Edit'}
      showInMenu={false}
    />,
  ], [navigate]);

  const columns = [
    ...props.columns,
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions,
    },
  ];

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 5,
      }}
    >
      <DataGrid
        autoHeight
        disableColumnMenu
        disableDensitySelector
        disableColumnSelector
        disableSelectionOnClick
        paginationMode={'server'}
        sortingMode={'server'}
        columns={columns}
        loading={response.loading}
        rowsPerPageOptions={defaultRowsPerPageOptions}
        rows={result.list}
        rowCount={result.total}
        page={Number(page) - 1}
        pageSize={Number(size)}
        onPageChange={(a) => !response.loading && setPage(a)}
        onPageSizeChange={(a) => !response.loading && setPageSize(a)}
      />
    </div>
  );
};
