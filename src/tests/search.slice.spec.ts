import { searchAction, searchReducer } from '../store/search/search.slice';

describe('searchSlice reducer', () => {
  it('should handle initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
      searchValue: localStorage.getItem('searchValue') || '',
    });
  });

  it('should handle setSearchValue', () => {
    const previousState = { searchValue: '' };
    const newValue = 'bulbasaur';
    expect(searchReducer(previousState, searchAction.setSearchValue(newValue))).toEqual({
      searchValue: newValue,
    });
  });
});
