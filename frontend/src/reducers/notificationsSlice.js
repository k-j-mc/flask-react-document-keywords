import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: 'idle',
  error: null
}


export const sendNotification = createAsyncThunk("sendNotification", async (e) => {

    return e;

});


export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,

  extraReducers: (builder) => {

    builder.addCase(sendNotification.pending, (state, action) => {
      state.status = "loading"
    });

    builder.addCase(sendNotification.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = "succeeded"
    });

    builder.addCase(sendNotification.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
    });
  },
})

export default notificationsSlice.reducer;