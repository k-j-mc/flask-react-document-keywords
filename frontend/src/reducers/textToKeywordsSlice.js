import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: 'idle',
  error: null
}


export const getKeywords = createAsyncThunk("getKeywords", async (documentData) => {

    const response = await axios.post("http://localhost:5000/analysis/keywords", documentData);

    return response.data;

});


export const textToKeywordsSlice = createSlice({
  name: "textToKeywords",
  initialState,

  extraReducers: (builder) => {

    builder.addCase(getKeywords.pending, (state, action) => {
      state.status = "loading"
    });

    builder.addCase(getKeywords.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = "succeeded"
    });

    builder.addCase(getKeywords.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
    });
  },
})

export default textToKeywordsSlice.reducer