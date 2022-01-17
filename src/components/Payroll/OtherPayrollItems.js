import { useState } from "react";
import { Button, Grid, FormControlLabel, Checkbox, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addDeductionItem,
  updateDeductionItem,
  removeDeductionItem,
} from "../../store/otherpayrollitems";
import { setOtherItemsData } from "../../store/userprefs";
import CustomModal from "../Controls/CustomModal";
import ChooseEmployee from "../Controls/ChooseEmployee";

export default function OtherPayrollItems() {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector((state) => state.userprefs.selectedEmployee);
  const otherItemsList = useSelector((state) => state.otherpayrollitems);
  const otherItemsData = useSelector((state) => state.userprefs.otherItemsData, shallowEqual);

  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState("");

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
          <Grid item xs={12}>
            <Typography variant="caption">Show in Table</Typography>
          </Grid>
          {otherItemsList.map((item, idx) => (
            <div key={idx}>
              <Grid item xs={6}>
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
              <Grid item xs={3}>
                <TextField
                  label="Amount"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    otherItemsData.find((data) => data.id === selectedEmployee.id)?.[item.name] ?? 0
                  }
                  onChange={(e) => {
                    dispatch(
                      setOtherItemsData([
                        ...otherItemsData.filter((data) => data.id !== selectedEmployee.id),
                        {
                          ...otherItemsData.find((data) => data.id === selectedEmployee.id),
                          id: selectedEmployee.id,
                          [item.name]: e.target.value,
                        },
                      ])
                    );
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button color="error" onClick={() => dispatch(removeDeductionItem(item))}>
                  Remove
                </Button>
              </Grid>
            </div>
          ))}
          <Grid item xs={4}>
            <TextField
              placeholder="New Custom Item"
              variant="standard"
              value={newItem}
              onChange={(e) => {
                setNewItem(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(
                  addDeductionItem({
                    name: newItem
                      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                        return index === 0 ? word.toLowerCase() : word.toUpperCase();
                      })
                      .replace(/\s+/g, ""),
                    isActive: true,
                    header: newItem,
                  })
                );
                setNewItem("");
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}
