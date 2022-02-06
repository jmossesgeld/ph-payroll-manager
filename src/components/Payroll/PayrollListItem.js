import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, Typography } from "@mui/material";
import ExportToExcel from "./ExportToExcel";

export default function PayrollListItem(props) {
  const CustomGrid = (props) => (
    <Grid item {...props} sx={{ display: "flex", alignItems: "center" }}>
      {props.children}
    </Grid>
  );

  return (
    <Grid container sx={{ border: "solid 1px #cccccc", p: 2 }}>
      <CustomGrid xs={12} sm={12} md={4}>
        <Typography variant="caption">
          Date Created: {new Date(props.pay.dateCreated).toLocaleString()}
        </Typography>
      </CustomGrid>
      <CustomGrid xs={12} sm={12} md={2.5}>
        <Typography variant="caption">No. of Employees: {props.pay.rows.length}</Typography>
      </CustomGrid>
      <CustomGrid xs={12} sm={12} md={2.5}>
        <Typography variant="caption">
          Net Pay:{" "}
          {props.pay.rows
            .reduce((prev, curr) => prev + curr.netPay, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "PHP",
            })}
        </Typography>
      </CustomGrid>
      <Grid item xs={4} sm={3} md={1.5}>
        <ExportToExcel pay={props.pay} />
      </Grid>
      <Grid item xs={2} sm={2} md={0.75}>
        <Button>
          <EditIcon />
        </Button>
      </Grid>
      <Grid item xs={4} sm={4} md={0.75}>
        <Button>
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
