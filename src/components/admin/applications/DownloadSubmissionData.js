import React from 'react';
import {utils, writeFile} from "xlsx";

const allDetailsWorkbook = (data) => {
  console.log(data)
  data.forEach(item => console.log(item[0], item[1]))
  const workbook = utils.book_new()
   data.forEach(item => utils.book_append_sheet(workbook, utils.json_to_sheet(item[1]), item[0].toString()))
   return writeFile(workbook, `${data[0][1][0].application_reference}.xlsx`);
}

const downloadSubmissionData = (data) => {
  const header = data.applicationHeader
  const areas = data.areas
  const projects = data.orderheaders
  const items = data.orderdetails
  const locations = data.sitelocations
  const worksheets = data.worksheets

  const bookData = {
    header,
    areas,
    projects,
    locations,
    items,worksheets
  }


  console.log(Object.entries(bookData))
  allDetailsWorkbook(Object.entries(bookData))

};

export default downloadSubmissionData;