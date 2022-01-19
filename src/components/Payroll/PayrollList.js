import { Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PayrollListItem from "./PayrollListItem";

const paperStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "auto",
  width: 800,
  maxWidth: "80vw",
  padding: 2,
  // backgroundColor: "#FEF5ED",
  mt: 2,
};

export default function PayrollList() {
  const payrollList = useSelector((state) => state.payrolls);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "auto" }}>
      <Paper sx={paperStyle} elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Payroll List</Typography>
          </Grid>
          {payrollList.map((pay, idx) => (
            <Grid item xs={12} key={idx}>
              <PayrollListItem date={pay.dateCreated} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Link to="/new">New Payroll</Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
