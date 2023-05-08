import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pozza/fetchPizzasStatus', async (params) => {
  const { categoryId, sort } = params;
  const { data } = await axios.get(
    `https://640f2de3cde47f68db43ec23.mockapi.io/items?${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sort.sortProperty}&order=desc`,
  );

  return data;
});

const initialState = {
  items: [],
};

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
