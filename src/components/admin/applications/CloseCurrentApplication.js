import React from 'react';
import {Button} from "@mui/material";
import {useMutation} from "@apollo/client";
import {AUTO_INCREMENT_APPLICATION} from "../../../api-calls/mutations/application-mutations";
import {useConfirm} from "material-ui-confirm";
import {gridSelectionsVar} from "../../../cache";

function findCurrentApplication(app) {
  return app.applicationCurrent === true
}

function findHighestAppNumber(apps) {
  return Math.max(...apps.map(o => o.applicationNumber))
}

const CloseCurrentApplication = ({rowData,setRowData}) => {

  const confirm = useConfirm()

  const [closeApp] = useMutation(AUTO_INCREMENT_APPLICATION,{
    fetchPolicy: 'network-only',
    onCompleted:(data) => {
      setRowData(data.autoCloseCurrentApplication.applicationSummaryWithCumulativeValues)
      gridSelectionsVar({...gridSelectionsVar(), selectedApplication: false})
    }
  });

  const currentApp = rowData?.find(app => findCurrentApplication(app)) ? rowData?.find(app => findCurrentApplication(app)):false

  const latestApp = findHighestAppNumber(rowData)

  const handleCloseApplication = () => {
    confirm({
      title: 'Confirm Close Application',
      titleProps: {color: 'red', fontWeight: 'bold'},
      description: `Are You Sure You Want To Close ${currentApp.applicationReference} ?`,
      confirmationText: 'Update Application',
      cancellationButtonProps: {color: 'secondary'},
      confirmationButtonProps: {autoFocus: true, color: 'update'},
      allowClose: false,
    }).then(() => closeApp())
  };

  return (
    <Button
      disabled={currentApp.applicationNumber !== latestApp}
      onClick={handleCloseApplication}
      color='action'
      fullWidth={true}>
      increment application
    </Button>
  );
};

export default CloseCurrentApplication;