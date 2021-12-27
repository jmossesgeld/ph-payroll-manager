import { Button, Typography } from "@mui/material";
import { useState } from "react";
import CustomModal from "../Controls/CustomModal";

export default function OtherPayrollItems(props) {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleModal} variant="contained" color="warning">
        Other Items
      </Button>
      <CustomModal open={open} onClose={toggleModal}>
        {props.items.map((item) => (
          <Typography key={item.name}>{item.name}</Typography>
        ))}
      </CustomModal>
    </>
  );
}
