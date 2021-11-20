import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ date: "2021-11-30", type: "regular", description: "Bonifacio Day" }];

const slice = createSlice({
    name:"holidays",
    initialState,
    reducers:{
        addHoliday: (state, action)=> state.push(action.payload)
    }
})

export const { addHoliday } = slice.actions;
export default slice.reducer;
