import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: 'idle',
  error: null
}


export const saveResults = createAsyncThunk("saveResults", async (e) => {

    return e;

});


export const resultsDataReducer = createSlice({
  name: "resultsData",
  initialState,

  extraReducers: (builder) => {

    builder.addCase(saveResults.pending, (state, action) => {
      state.status = "loading"
    });

    builder.addCase(saveResults.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = "succeeded"
    });

    builder.addCase(saveResults.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
    });
  },
})

export default resultsDataReducer.reducer;