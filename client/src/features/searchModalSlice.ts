import { createSlice } from '@reduxjs/toolkit';

const initialState: {search: object, isOpen: boolean} = {
  search: {},
  isOpen: false,
};

const searchModalSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    openModal: (state, { payload }): void => {
      state.search = payload;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.search = {};
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = searchModalSlice.actions;
export default searchModalSlice.reducer;
