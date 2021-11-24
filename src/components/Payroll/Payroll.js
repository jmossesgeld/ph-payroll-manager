import xlsx from "xlsx-js-style";
import { Input, Typography } from "@mui/material";
import { useState } from "react";

export default function Payroll() {
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
      <Input type="file" onChange={onFileUpload}>
        Upload Excel
      </Input>
      <Typography>{output}</Typography>
    </>
  );
}
