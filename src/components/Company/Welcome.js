import { Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  display: "flex",
  m: "20vh auto",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "left",
  maxWidth: "600px",
};

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={3} sx={styles}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h1" fontWeight="bold">
          MAGE
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h2" color="textSecondary" fontWeight="100" letterSpacing={10}>
          Payroll System
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => navigate("/employees")}>
          Get Started
        </Button>
        <Button sx={{ ml: 2 }}>How to use</Button>
      </Grid>
    </Grid>
  );
}
