import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { pokeAction } from '../store/pokeapi/poke.slice';
import { searchAction } from '../store/search/search.slice';

const actions = { ...searchAction, ...pokeAction };

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
