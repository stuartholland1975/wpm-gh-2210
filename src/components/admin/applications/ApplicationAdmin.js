import React from 'react';
import ApplicationAdminButtons from "./ApplicationAdminButtons";
import ApplicationsGrid from "../../grids/grids/ApplicationsGrid";
import {useQuery} from '@apollo/client';
import {GET_APPLICATION_HEADERS} from '../../../api-calls/queries/applications';

const ApplicationAdmin = () => {
  const [rowData, setRowData] = React.useState([]);
  const {loading, refetch} = useQuery(GET_APPLICATION_HEADERS, {
    fetchPolicy:'network-only',
    notifyOnNetworkStatusChange:true,
    onCompleted: data => setRowData(data.applicationSummaryWithCumulativeValues.nodes)
  });

  if (loading) return null;
  return (
    <div>
      <ApplicationAdminButtons rowData={rowData} setRowData={setRowData} refetch={refetch}/>
      <ApplicationsGrid rowData={rowData}/>
    </div>
  );
};

export default ApplicationAdmin;