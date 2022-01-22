import xlsx from "xlsx-js-style";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ExportToExcel(props) {
  const [output, setOutput] = useState("");

  const cleanData = (data) => {
    const clean = data.map((row) => {
      const cleanRow = {};
      Object.keys(row).forEach((key) => {
        if (key !== "id" && key !== "payrollId") {
          cleanRow[key] = row[key];
        }
      });
      return cleanRow;
    });
    return clean;
  };

  const exportFile = () => {
    const data = props.pay.rows.map((row) => {
      const newRow = {};
      props.pay.columns.forEach((col) => {
        newRow[col.headerName] = row[col.field] ?? 0;
      });
      return newRow;
    });

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    ws["!rows"] = [{ hpt: 30 }];
    ws["!cols"] = [{ wch: 30 }, ...props.pay.columns.map((col) => ({ wch: 10 }))];
    const originalHeader = ws["!ref"];
    console.log(xlsx.utils.decode_range(originalHeader));
    for (let i = 0; i < 100; i++) {
      try {
        ws[xlsx.utils.encode_cell({ c: i, r: 0 })].s = {
          font: {
            bold: true,
          },
        };
      } catch (error) {
        break;
      }
    }

    ws["!ref"] = originalHeader;
    xlsx.utils.book_append_sheet(wb, ws, "Payroll");
    xlsx.writeFile(wb, "payroll.xlsx");
  };

  return (
    <Button onClick={exportFile}>
      Export
      <img
        src="https://img.icons8.com/ios/24/000000/ms-excel.png"
        width={20}
        alt="Excel Icon"
        style={{ marginLeft: 5 }}
      />
    </Button>
  );
}
