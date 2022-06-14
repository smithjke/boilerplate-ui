import React, { useState } from 'react';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { CrudService } from '~/1st-crud';
import { usePromise } from '~/1st-react';
import { ApiListResult } from '~/1st-api';

const defaultRowsPerPageOptions = [3, 20, 50];
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
  // const urlService = useUrlService();
  // const urlData = useBehaviorSubject(urlService.urlData$);
  // const searchData = urlService.getSearchData<SearchData>(urlData);
  const [searchData, setSearchData] = useState<SearchData>({});

  const { page = 1, size = defaultRowsPerPageOptions[0], ...otherData } = searchData;

  const setPage = (newPage: number) => setSearchData({
    ...searchData,
    page: String(newPage + 1),
  });

  const setPageSize = (newPageSize: number) => setSearchData({
    ...searchData,
    size: String(newPageSize),
  });

  const data = usePromise(() => props.crudService.list({
    ...otherData,
    limit: Number(size),
    skip: (Number(page) - 1) * Number(size),
  }), [searchData]);

  const { result = defaultResult } = data;

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
        columns={props.columns}
        loading={data.loading}
        rowsPerPageOptions={defaultRowsPerPageOptions}
        rows={result.list}
        rowCount={result.total}
        page={Number(page) - 1}
        pageSize={Number(size)}
        onPageChange={(a) => !data.loading && setPage(a)}
        onPageSizeChange={(a) => !data.loading && setPageSize(a)}
      />
    </div>
  );
};
