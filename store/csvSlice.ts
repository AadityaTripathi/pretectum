// store/csvSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CsvState {
  data: string[][];  // Store the parsed CSV as a 2D array
}

const initialState: CsvState = {
  data: [],
};

export const csvSlice = createSlice({
  name: 'csv',
  initialState,
  reducers: {
    setCsvData: (state, action: PayloadAction<string[][]>) => {
      state.data = action.payload;
    },
  },
});

export const { setCsvData } = csvSlice.actions;
export default csvSlice.reducer;
