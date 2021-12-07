import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export default function PayrollTable(props) {
  const { rows } = props;
  const [editRowsModel, setEditRowsModel] = useState({});
  const columns = [
    { field: "employeeName", headerName: "Employee", width: 200 },
    { field: "basicPay", headerName: "Basic Pay", type: "number" },
    { field: "overtime", headerName: "Overtime", type: "number" },
    { field: "holiday", headerName: "Holiday", type: "number" },
    { field: "restDay", headerName: "Rest Day", type: "number" },
    { field: "lateUndertime", headerName: "Late / UT", type: "number" },
    { field: "absences", headerName: "Absences", type: "number" },
    { field: "grossPay", headerName: "Gross Pay", type: "number" },
    { field: "sssCont", headerName: "SSS", type: "number" },
    { field: "phicCont", headerName: "Philhealth", type: "number" },
    { field: "hdmfCont", headerName: "Pag-ibig", type: "number" },
  ];

  columns.forEach((column) => {
    column.editable = true;
    if (!column.width) {
      column.width = 120;
    }
    if (column.field !== "employeeName") {
      column.valueFormatter = (params) => {
        const value = Math.round(Number(params.value) * 100) / 100;
        return value
          .toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })
          .slice(1);
      };
    }
  });

  function deepMergeObjects(obj1, obj2) {
    const obj3 = { ...obj1 };
    for (const prop in obj2) {
      if (obj2.hasOwnProperty(prop)) {
        if (typeof obj2[prop] === "object") {
          if (Object.keys(obj2[prop])[0] === "value") {
            obj3[prop] = obj2[prop].value;
          } else {
            obj3[prop] = deepMergeObjects(obj1[prop] ?? {}, obj2[prop]);
          }
        } else {
          obj3[prop] = obj2[prop];
        }
      }
    }
    return obj3;
  }

  const onEditRowsModelChange = (model) => {
    if (Object.keys(model).length > 0) {
      const newObj = deepMergeObjects(rows, model);
      console.log(newObj);
    }
    setEditRowsModel(model);
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editRowsModel={editRowsModel}
      onEditRowsModelChange={onEditRowsModelChange}
    />
  );
}
