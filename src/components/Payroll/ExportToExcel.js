import xlsx from "xlsx-js-style";
import { Button,  } from "@mui/material";

export default function ExportToExcel(props) {

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
    const originalHeader = ws["!ref"];
    const range = xlsx.utils.decode_range(originalHeader); // {s: {c: 0, r: 0}, e: {c: 1, r: 1}} zero-based

    for (let col = range.s.c; col <= range.e.c; col++) {
      for (let row = range.s.r; row <= range.e.r; row++) {
        const cell = ws[xlsx.utils.encode_cell({ c: col, r: row })];
        if (cell) {
          if (row === 0) {
            //header row
            cell.s = {
              ...cell.s,
              font: { bold: true },
              alignment: { horizontal: "center", vertical: "center", wrapText: true },
              border: { bottom: { style: "medium" } },
            };
          }
          cell.z = '_(* #,##0.00_);_(* (#,##0.00);_(* " - "??_);_(@_)';
        }
      }
    }

    ws["!rows"] = [{ hpt: 30 }];
    ws["!cols"] = [{ wch: 30 }, ...props.pay.columns.map((col) => ({ wch: 10 }))];

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
