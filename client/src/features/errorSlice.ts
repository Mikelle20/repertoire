import { createSlice } from '@reduxjs/toolkit';

const initialState: {error: {isError: boolean, error: string}} = {
  error: {
    isError: false,
    error: '(500) Internal Server Error.',
  },
};
const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, { payload }): void => {
      state.error.isError = payload;
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
