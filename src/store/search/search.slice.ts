import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISearchSectionState from '../../types/searchSectionState';

const initialState: ISearchSectionState = {
  searchValue: localStorage.getItem('searchValue') || '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

const searchAction = searchSlice.actions;
const searchReducer = searchSlice.reducer;

export { searchSlice, searchAction, searchReducer };
