import React from 'react';
import {Button} from "@mui/material";
import {useMutation, useReactiveVar} from "@apollo/client";
import {REOPEN_CLOSED_APPLICATION} from "../../../api-calls/mutations/application-mutations";
import {gridSelectionsVar} from "../../../cache";

const ReOpenClosedApplication = () => {
  const isSelected = useReactiveVar(gridSelectionsVar).selectedApplication !== false
  const isCurrent = useReactiveVar(gridSelectionsVar).selectedApplication[0]?.applicationCurrent
  const isSubmitted = useReactiveVar(gridSelectionsVar).selectedApplication[0]?.applicationSubmitted
  const selectedApplication =  useReactiveVar(gridSelectionsVar).selectedApplication

  const [reopen] = useMutation(REOPEN_CLOSED_APPLICATION,{
    onCompleted:() => gridSelectionsVar({...gridSelectionsVar(), selectedApplication: false})
  })

  const handleReOpen = () => {
    reopen({variables:{appToOpen:Number(selectedApplication[0].id)}}).then(console.log)
  }
  return (
    <Button
     disabled={!isSelected || isCurrent || isSubmitted}
      onClick={handleReOpen}
      color='action'
      fullWidth={true}>
      open selected application
    </Button>
  );
};

export default ReOpenClosedApplication;