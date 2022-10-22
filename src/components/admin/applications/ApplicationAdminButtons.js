import React from 'react';
import {Button, Grid} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import CloseCurrentApplication from "./CloseCurrentApplication";
import ReOpenClosedApplication from "./ReOpenClosedApplication";
import SubmitApplication from "./SubmitApplication";

const ApplicationAdminButtons = ({rowData, setRowData}) => {
  return (
    <Grid container spacing={2} mb={2} mt={1} columns={5}>
      <Grid item={true} xs={1}>
        <CloseCurrentApplication rowData={rowData} setRowData={setRowData}/>
      </Grid>
      <Grid item={true} xs={1}>
        <ReOpenClosedApplication rowData={rowData}/>
      </Grid>
      <Grid item={true} xs={1}>
        <SubmitApplication rowData={rowData}/>
      </Grid>
      <Grid item={true} xs={1}>
        <Button
          disabled={true}
         
          fullWidth={true}
          color='action'>
          remove submission flag
        </Button>
      </Grid>
      <Grid item={true} xs={1}>
        <Button
          startIcon={<DownloadIcon/>}
          disabled={true}
          /* disabled={
             selectedApplication === false ||
             selectedApplication?.applicationSubmitted === false
           }
           onClick={handleExportDetail}*/
          fullWidth={true}
          color='action'>
          download submission data
        </Button>
      </Grid>
      {/*  <Grid item={true} xs={1}>
        <Button
          disabled={!isSelected}
          fullWidth={true}
          color='action'>
          view application detail
        </Button>
      </Grid>*/}
    </Grid>
  );
};

export default ApplicationAdminButtons;