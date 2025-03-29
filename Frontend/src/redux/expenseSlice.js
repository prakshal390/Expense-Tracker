import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [], // Ensure items is initialized
    category: 'all',
    markAsDone: 'Both',
    singleExpense:null
  },
  reducers: {
    setExpenses: (state, action) => {
      state.items = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMarkAsDone: (state, action) => {
      state.markAsDone = action.payload;
    },
    setSingleExpense: (state, action) => {
      state.singleExpense = action.payload;
      },
  },
});

export const { setExpenses, setCategory, setMarkAsDone , setSingleExpense } = expenseSlice.actions;

export default expenseSlice.reducer;