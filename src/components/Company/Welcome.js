import { Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  m: "10vh auto",
  textAlign: "left",
  maxWidth: "600px",
  p: "0 10px",
};

function FrontButton({ children, onClick, ...props }) {
  return (
    <Button sx={{ m: 1 }} variant="contained" onClick={onClick} {...props}>
      {children}
    </Button>
  );
}

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
      <Grid
        item
        xs={12}
        mt={3}
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <FrontButton onClick={() => navigate("/employees")}>Manage Employees</FrontButton>
        <FrontButton color="success" onClick={() => navigate("/new")}>
          Create New Payroll
        </FrontButton>
        <FrontButton variant="text" onClick={() => navigate("/tutorial")}>
          How to use
        </FrontButton>
      </Grid>
    </Grid>
  );
}
