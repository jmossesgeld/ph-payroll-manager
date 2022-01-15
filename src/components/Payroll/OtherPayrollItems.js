import { Button, Grid, FormControlLabel, Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import CustomModal from "../Controls/CustomModal";
import { useSelector, useDispatch } from "react-redux";
import { updateDeductionItem } from "../../store/otherpayrollitems";
import ChooseEmployee from "../Controls/ChooseEmployee";
import { setSelectedEmployee } from "../../store/userprefs";

export default function OtherPayrollItems(props) {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector((state) => state.userprefs.selectedEmployee);
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
          <Grid item xs={12}>
            <ChooseEmployee />
          </Grid>
          {props.items.map((item, idx) => (
            <>
              <Grid item xs={7} key={idx}>
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
              <Grid item xs={5}>
                <TextField
                  label="Amount"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    props.otherItemsData.find((data) => data.id === selectedEmployee.id)?.[
                      item.name
                    ] ?? 0
                  }
                  onChange={(e) => {
                    props.setOtherItemsData((prev) => {
                      return [
                        ...prev.filter((data) => data.id !== selectedEmployee.id),
                        {
                          ...prev.find((data) => data.id === selectedEmployee.id),
                          id: selectedEmployee.id,
                          [item.name]: e.target.value,
                        },
                      ];
                    });
                  }}
                />
              </Grid>
            </>
          ))}
        </Grid>
      </CustomModal>
    </>
  );
}
