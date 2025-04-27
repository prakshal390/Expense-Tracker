import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [], // Ensure items is initialized
    category: 'all',
    markAsDone: 'Both',
    singleExpense: null
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
    addExpense: (state, action) => {
      state.items.push(action.payload); // Add the new expense to the list
    },
    updateExpense: (state, action) => {
      const index = state.items.findIndex((expense) => expense._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload; // Update the existing expense
      }
    },
  },
});

export const { setExpenses, setCategory, setMarkAsDone, setSingleExpense, addExpense, updateExpense } = expenseSlice.actions;

export default expenseSlice.reducer;