import React, { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { ApiListQuery, ApiListResult } from '~/1st-api';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { RxjsCrudService } from '../services';

const defaultRowsPerPageOptions = [10, 20, 50];
const defaultResult: ApiListResult<any> = { list: [], total: 0 };

export type RxjsDataGridCrudIndexListProps = {
  columns: GridColumns;
  crudService: RxjsCrudService;
};

type SearchData = {
  page?: string;
  size?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
};

export const RxjsDataGridCrudIndexList: React.FC<RxjsDataGridCrudIndexListProps> = (props) => {
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

  const {
    page = 1,
    size = defaultRowsPerPageOptions[0],
    sort,
    direction,
    ...otherData
  } = searchData;

  const query: ApiListQuery = {
    limit: Number(size),
    skip: (Number(page) - 1) * Number(size),
  };

  if (sort && direction) {
    query.sort = String(sort);
    query.direction = direction === 'asc' ? 'asc' : 'desc';
  }

  const asyncData = useBehaviorSubject(props.crudService.cachedList(query), [searchParams]);
  const result = asyncData.data ?? defaultResult;

  console.log('RxjsDataGridCrudIndexList otherData >>>', otherData);
  // console.log('RxjsDataGridCrudIndexList columns >>>', props.columns);
  // console.log('RxjsDataGridCrudIndexList crudService >>>', props.crudService);
  // console.log('RxjsDataGridCrudIndexList searchData >>>', JSON.stringify(searchData));
  // console.log('RxjsDataGridCrudIndexList asyncData >>>', asyncData);

  const setPage = (newPage: number) => setSearchParams({
    ...searchData,
    page: String(newPage + 1),
  });

  const setPageSize = (newPageSize: number) => setSearchParams({
    ...searchData,
    size: String(newPageSize),
  });

  const setSortModel = (newSortModel: GridSortModel) => {
    if (newSortModel.length) {
      setSearchParams({
        ...searchData,
        page: '1',
        sort: String(newSortModel[0].field),
        direction: String(newSortModel[0].sort),
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sort: _sort, direction: _direction, ...other } = searchData;
      setSearchParams({ ...other, page: '1' });
    }
  };

  const sortModel = sort ? [{ field: sort, sort: direction }] : [];

  const getActions = useCallback((params: GridRowParams) => [
    <GridActionsCellItem
      icon={<EditIcon/>}
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
    <Box
      sx={(theme) => ({
        background: theme.palette.background.paper,
        borderRadius: 1,
      })}
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
        loading={asyncData.loading}
        rowsPerPageOptions={defaultRowsPerPageOptions}
        rows={result.list}
        rowCount={result.total}
        page={Number(page) - 1}
        pageSize={Number(size)}
        sortModel={sortModel}
        onPageChange={(a) => !asyncData.loading && setPage(a)}
        onPageSizeChange={(a) => !asyncData.loading && setPageSize(a)}
        onSortModelChange={(a) => !asyncData.loading && setSortModel(a)}
      />
    </Box>
  );
};
