// store/csvSlice.ts
import { FlightBookingInterface } from '@/types/CsvDataInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CsvState {
  data: FlightBookingInterface[]  // Store the parsed CSV as a 2D array
}

const initialState: CsvState = {
  data: [],
};

export const csvSlice = createSlice({
  name: 'csv',
  initialState,
  reducers: {
    setCsvData: (state, action: PayloadAction<FlightBookingInterface[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setCsvData } = csvSlice.actions;
export default csvSlice.reducer;