import { useState } from "react";
import { Button, TextField, Modal, FormControl, Switch } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "& input": { margin: "2px" },
  display: "flex",
  flexWrap: "wrap",
};

export default function NewEmployee() {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        color="success"
        sx={{ alignSelf: "flex-end" }}
      >
        Add New Employee
      </Button>
      <Modal open={open} onClose={handleClick}>
        <FormControl sx={style}>
          <TextField
            sx={{ m: 1, width:200 }}
            id="lastName"
            label="Last Name"
            variant="outlined"
            size="small"
          />
          <TextField
            sx={{ m: 1, width:200 }}
            id="firstName"
            label="First Name"
            variant="outlined"
            size="small"
          />
          <TextField
            sx={{ m: 1, width:200 }}
            id="middleName"
            label="Middle Name"
            variant="outlined"
            size="small"
          />
          <Switch id="isDaily" label="Is Daily" variant="outlined" />
          <TextField sx={{ m: 1, width: 200 }} id="salary" label="Salary" variant="outlined" size="small" />
          <Button>Submit</Button>
        </FormControl>
      </Modal>
    </>
  );
}
