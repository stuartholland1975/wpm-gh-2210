/** @format */

import React from "react";
import {Box, Button, TextField} from "@mui/material";
import {useLazyQuery, useMutation} from "@apollo/client";
import {gridSelectionsVar} from "../../../cache";

import {VALIDATE_PROJECT_IMPORT_DATA} from "../../../api-calls/queries/projects";
import {read, utils} from "xlsx";
import ImportProjectDetailGrid from "../../grids/grids/ImportProjectDetailGrid";
import {IMPORT_ORDER_DETAILS} from "../../../api-calls/mutations/project-mutations";
import {useNavigate} from "react-router-dom";

const ImportProjectDetails = () => {
  const [importData, setImportData] = React.useState(null);
  const [refs, setRefs] = React.useState(null);
  const [items, setItems] = React.useState(null);
  const [activities, setActivities] = React.useState(null);
  const [dataValid, setDataValid] = React.useState(false);

  const navigate = useNavigate()

  const [validateImportData] = useLazyQuery(VALIDATE_PROJECT_IMPORT_DATA, {
    fetchPolicy: 'network-only',
    onCompleted: data => data.validateProjectImportData.isDataValid && setDataValid(true)
  });

  const [submitImportData] = useMutation(IMPORT_ORDER_DETAILS, {
    onCompleted: () => navigate('/admin/projects')
  })

  const handleImport = (event) => {
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setRefs([...new Set(rows.map((item) => item.reference))]);
          setItems(rows.map((item) => item.itemNumber));
          setActivities([...new Set(rows.map((item) => item.activityCode))]);
          setImportData(rows.map(item => ({
            ...item,
            packNumber: item.packNumber.toString(),
            orderheaderId: Number(gridSelectionsVar().selectedOrder[0].id)
          })))
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleValidateData = () => {
    const apiData = {
      references: refs,
      items,
      codes: activities,
      rawData: importData,
    }
    validateImportData({
      variables: {
        importData: apiData,
        orderId: Number(gridSelectionsVar().selectedOrder[0].id),
      },
    }).then((r) => console.log(r));
  };

  const handleSubmitData = () => {
    submitImportData({
      variables: {importData: importData, orderId: Number(gridSelectionsVar().selectedOrder[0].id)}
    }).then(() => setImportData(null))
  }

  return (
    <Box>
      <Box pt={5} pb={5}>
        <hr/>
        <div className="grid-title">IMPORT PROJECT DETAIL</div>
        <Box display={"flex"} flexDirection={'row'} justifyContent={'space-between'} gap={10}>
          <TextField
            variant="filled"
            accept="xlsx"
            type="file"
            fullWidth={true}
            onChange={(data) => {
              handleImport(data);
            }}
          />
          <Button
            disabled={importData === null || dataValid}
            fullWidth={true}
            onClick={handleValidateData}
          >
            Validate Data
          </Button>
          <Button
            disabled={dataValid === false}
            fullWidth={true}
            onClick={handleSubmitData}
            color='create'
          >
            submit Data
          </Button>
        </Box>
      </Box>
      <ImportProjectDetailGrid importData={importData}/>
    </Box>
  );
};

export default ImportProjectDetails;
