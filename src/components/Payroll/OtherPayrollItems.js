import { Button, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import CustomModal from "../Controls/CustomModal";
import { useDispatch } from "react-redux";
import { updateDeductionItem } from "../../store/otherpayrollitems";

export default function OtherPayrollItems(props) {
  const dispatch = useDispatch();
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
        <Grid container spacing={2}>
          {props.items.map((item, idx) => (
            <Grid item xs={12} key={idx}>
              <FormControlLabel
                label={item.header}
                control={
                  <Checkbox
                    checked={item.isActive ?? false}
                    onChange={(e) => {
                      dispatch(updateDeductionItem({ item: idx, isActive: e.target.checked }));
                    }}
                  />
                }
              />
            </Grid>
          ))}
          
        </Grid>
      </CustomModal>
    </>
  );
}
