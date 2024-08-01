import { pokeAction, pokeReducer } from '../store/pokeapi/poke.slice';

describe('pokeSlice reducer', () => {
  it('should handle initial state', () => {
    expect(pokeReducer(undefined, { type: 'unknown' })).toEqual({
      selectedItems: [],
    });
  });

  it('should handle clearSelectedValue', () => {
    const previousState = { selectedItems: [1, 2, 3] };
    expect(pokeReducer(previousState, pokeAction.clearSelectedValue())).toEqual({
      selectedItems: [],
    });
  });

  it('should handle addSelectedValue', () => {
    const previousState = { selectedItems: [] };
    expect(pokeReducer(previousState, pokeAction.addSelectedValue(1))).toEqual({
      selectedItems: [1],
    });
  });

  it('should handle deleteSelectedValue', () => {
    const previousState = { selectedItems: [1, 2, 3] };
    expect(pokeReducer(previousState, pokeAction.deleteSelectedValue(2))).toEqual({
      selectedItems: [1, 3],
    });
  });
});
