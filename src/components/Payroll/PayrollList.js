import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import PayrollListItem from "./PayrollListItem";
import { useNavigate } from "react-router-dom";

const paperStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "auto",
  width: 800,
  maxWidth: "80vw",
  padding: 4,
  backgroundColor: "#FEF5ED",
  mt: 5,
};

export default function PayrollList() {
  const navigate = useNavigate();
  const payrollList = useSelector((state) => state.payrolls);
  const sortedPayroll = [...payrollList].sort((a, b) => b.dateCreated - a.dateCreated);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "auto" }}>
      <Paper sx={paperStyle} elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Payroll History</Typography>
          </Grid>
          {sortedPayroll.map((pay, idx) => (
            <Grid item xs={12} key={idx}>
              <PayrollListItem pay={pay} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => navigate("/new")}>
              Create New Payroll
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
