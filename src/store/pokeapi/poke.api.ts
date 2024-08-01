import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPokemonResult, IPokemons } from '../../types/Pokemon/pokemons';
import IPokemonDetails from '../../types/Pokemon/pokemonDetails';
import apiConstants from '../../constants/apiConstants';

export const pokeApi = createApi({
  reducerPath: 'pokeapi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: build => ({
    pokemons: build.query<IPokemonResult[], number>({
      query: (offset: number) => ({
        url: `${apiConstants.API_URL}pokemon`,
        params: { offset },
      }),
      transformResponse: (response: IPokemons) => response.results,
    }),
    pokemonSearch: build.query<IPokemonDetails, number>({
      query: (id: number) => ({
        url: `${apiConstants.API_URL}pokemon/${id}/`,
      }),
    }),
    pokemonDetails: build.query<IPokemonDetails, string>({
      query: (url: string) => ({
        url,
      }),
    }),
  }),
});

export const { usePokemonsQuery, useLazyPokemonSearchQuery, useLazyPokemonDetailsQuery } =
  pokeApi;
