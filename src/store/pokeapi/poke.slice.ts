import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IPokeState from '../../types/pokeState';

const initialState: IPokeState = {
  selectedItems: [],
};

const pokeSlice = createSlice({
  name: 'poke',
  initialState,
  reducers: {
    clearSelectedValue: state => {
      state.selectedItems = [];
    },
    addSelectedValue: (state, action: PayloadAction<number>) => {
      state.selectedItems = [...state.selectedItems, action.payload];
    },
    deleteSelectedValue: (state, action: PayloadAction<number>) => {
      state.selectedItems = state.selectedItems.filter(item => item !== action.payload);
    },
  },
});

const pokeAction = pokeSlice.actions;
const pokeReducer = pokeSlice.reducer;

export { pokeAction, pokeReducer, pokeSlice };
