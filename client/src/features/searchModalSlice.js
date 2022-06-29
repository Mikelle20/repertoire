import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: {

  },
  isOpen: false
}

const searchModalSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.search = payload
      state.isOpen = true
    },
    closeModal: (state, action) => {
      state.search = {}
      state.isOpen = false
    }
  }
})

export const { openModal, closeModal } = searchModalSlice.actions
export default searchModalSlice.reducer
