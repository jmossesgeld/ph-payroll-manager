import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CustomModal from "../Layout/CustomModal";

export default function NewHoliday() {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={toggleModal}>Open Modal</Button>
      </Box>
      <CustomModal open={open} onClose={toggleModal}>
        <Typography>This is a modal</Typography>
      </CustomModal>
    </>
  );
}
