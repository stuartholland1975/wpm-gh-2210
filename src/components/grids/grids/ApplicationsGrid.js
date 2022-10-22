/** @format */

import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {formatDate, formatNumberGridNoDecimals} from '../../../functions/formattingFunctions';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import {useLocation} from "react-router-dom";
import {gridSelectionsVar} from "../../../cache";

const ApplicationsGrid = ({rowData}) => {

  const location = useLocation()

  const gridRef = React.useRef()

  const columnDefs = React.useMemo(
    () => [
      {
        field: 'applicationNumber',
        sort: 'desc',
        checkboxSelection: () => location.pathname === '/admin/applications',
      },
      {
        field: 'applicationReference',
      },
      {
        field: 'applicationDate',
        valueFormatter: params => formatDate(params.value)
      },
      {
        field: 'prevCumulativeApplicationValue',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'thisApplicationValue',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
        cellStyle: {fontWeight: 'bold'},
      },
      {
        field: 'cumulativeApplicationValue',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'areaCount',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'orderCount',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      }, {
        field: 'locationCount',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'itemCount',
        valueFormatter: formatNumberGridNoDecimals,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'applicationSubmitted',
        headerClass: 'text-center',
        cellRenderer: params => {
          return params.data.applicationSubmitted === true ?
            <div style={{textAlign: "center", marginTop: 5}}><DoneIcon color='submit'/></div> :
            <div style={{textAlign: "center", marginTop: 5}}><ClearIcon color='error'/></div>
        }
      },
      {
        field: 'applicationOpen',
        headerClass: 'text-center',
        cellRenderer: params => {
          return params.data.applicationOpen === true ?
            <div style={{textAlign: "center", marginTop: 5}}><DoneIcon color='submit'/></div> :
            <div style={{textAlign: "center", marginTop: 5}}><ClearIcon color='error'/></div>
        }
      },
      {
        field: 'applicationCurrent',
        headerClass: 'text-center',
        cellRenderer: params => {
          return params.data.applicationCurrent === true ?
            <div style={{textAlign: "center", marginTop: 5}}><DoneIcon color='submit'/></div> :
            <div style={{textAlign: "center", marginTop: 5}}><ClearIcon color='error'/></div>
        }
      },
      /*{
        colId: 'selectButton', cellRenderer: GridButton, flex: 1.5, cellRendererParams: params => ({
          path: params.data.id.toString()
        })

      },*/
    ],
    [],
  );

  const defaultColDef = React.useMemo(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    [],
  );
  const rowClassRules = React.useMemo(() => {
    return {
      'application-current': (params) => {
        return params.data.applicationCurrent;
      },
    };
  }, []);


    const onSelectionChanged = React.useCallback(() => {
      const selectedRow = gridRef.current.api.getSelectedRows();
      selectedRow.length === 0
        ? gridSelectionsVar({...gridSelectionsVar(), selectedApplication: false})
        : gridSelectionsVar({
          ...gridSelectionsVar(),
          selectedApplication: selectedRow,
        });
    }, []);


  return (
    <AgGridReact
      className='ag-theme-alpine'
      ref={gridRef}
      rowSelection='single'
      animateRows='true'
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowData={rowData}
      domLayout='autoHeight'
      pagination={false}
      paginationPageSize={10}
      suppressRowClickSelection={true}
      rowClassRules={rowClassRules}
      onSelectionChanged={onSelectionChanged}
    />
  );
};

export default ApplicationsGrid;
