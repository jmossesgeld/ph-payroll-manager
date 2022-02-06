import { Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  m: "10vh auto",
  textAlign: "left",
  maxWidth: "600px",
};

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <Grid container rowSpacing={2} sx={styles}>
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
      <Grid item xs={12} mt={3}>
        <Button variant="contained" onClick={() => navigate("/employees")}>
          Get Started
        </Button>
        <Button sx={{ ml: 2 }}>How to use</Button>
      </Grid>
    </Grid>
  );
}
