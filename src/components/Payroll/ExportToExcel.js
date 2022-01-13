import xlsx from "xlsx-js-style";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";

function downloadFile(data, fileName) {
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  xlsx.writeFile(wb, fileName);
}

function readExcel(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = e.target.result;
    const workbook = xlsx.read(data, { type: "binary" });
    const first_sheet_name = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[first_sheet_name];
    const data_json = xlsx.utils.sheet_to_json(worksheet);
    console.log(data_json);
  };
  reader.readAsBinaryString(file);
}


export default function ExportToExcel() {
  const [output, setOutput] = useState("");

  const onFileUpload = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = xlsx.read(data, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const cell = worksheet["A1"];
    setOutput(cell?.v ?? "undefined");
    cell.s = {
      font: {
        name: "Calibri",
        sz: 24,
        bold: true,
        color: { rgb: "FFFFAA00" },
      },
    };
    cell.v = "SAMPLE";
    xlsx.writeFile(workbook, "out.xlsx");
  };

  return (
    <>
      <TextField type="file" onChange={onFileUpload}>
        Sample Upload Excel
      </TextField>
      <Typography>{output}</Typography>
    </>
  );
}
