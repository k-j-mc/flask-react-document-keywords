import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: 'idle',
  error: null
}


export const getText = createAsyncThunk("getText", async (documentText) => {

    const response = await axios.post("http://localhost:5000/analysis/pdfreader", documentText);

    return response.data;

});


export const documentToTextSlice = createSlice({
  name: "documentToText",
  initialState,

  extraReducers: (builder) => {

    builder.addCase(getText.pending, (state, action) => {
      state.status = "loading"
    });

    builder.addCase(getText.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = "succeeded"
    });

    builder.addCase(getText.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
    });
  },
})

export default documentToTextSlice.reducer