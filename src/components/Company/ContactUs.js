import {
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";

import CustomModal from "../Controls/CustomModal";

export default function ContactUs() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem button onClick={toggleModal}>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Contact Us" />
      </ListItem>
      <CustomModal open={open} onClose={toggleModal}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center">
              Contact Us
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Your Name" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Your Email" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Subject" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Message" variant="outlined" multiline rows={5} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Send
            </Button>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}
