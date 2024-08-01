import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Card from '../Card/Card';
import IPokemonDetails from '../../types/Pokemon/pokemonDetails';
import SelectedCard from '../SelectedCard/SelectedCard';
import './contentSection.css';
import SelectionFlyout from '../SelectionFlyout/SelectionFlyout';
import { IPokemonResult } from '../../types/Pokemon/pokemons';
import {
  useLazyPokemonDetailsQuery,
  useLazyPokemonSearchQuery,
  usePokemonsQuery,
} from '../../store/pokeapi/poke.api';
import useAppSelector from '../../hooks/redux';
import useActions from '../../hooks/actions';
import { Datas } from 'react-csv-downloader/dist/esm/lib/csv';

const ContentSection: React.FC = () => {
  const { searchValue } = useAppSelector(state => state.search);
  const { selectedItems } = useAppSelector(state => state.poke);
  const { clearSelectedValue, addSelectedValue, deleteSelectedValue } = useActions();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IPokemonDetails | null>(null);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState<IPokemonDetails[] | null>(null);

  const page = Number(searchParams.get('page')) || 1;
  const id = Number(searchParams.get('details'));
  const offset = (page - 1) * 20;

  const { isLoading: isLoadingPokemons, data: pokemons } = usePokemonsQuery(offset);
  const [fetchPokemonDetails] = useLazyPokemonDetailsQuery();
  const [fetchPokemonDetailsBySearch] = useLazyPokemonSearchQuery();

  useEffect(() => {
    const fetchDetails = async () => {
      if (pokemons) {
        const pokemonDetailsPromises: Promise<IPokemonDetails>[] = pokemons.map(
          ({ url }: IPokemonResult) => fetchPokemonDetails(url).unwrap(),
        );

        try {
          const pokemonDetails = await Promise.all(pokemonDetailsPromises);
          setPokemonList(pokemonDetails);
        } catch (error) {
          console.error('Error fetching pokemon details:', error);
        }
      }
    };

    fetchDetails();
  }, [fetchPokemonDetails, pokemons]);

  const handleNextCard = () => {
    setPokemonList(null);
    setIsLoading(true);

    setTimeout(() => {
      setSearchParams({ page: (page + 1).toString() });
      setIsLoading(false);
    }, 500);
  };

  const handlePreviousCard = () => {
    setPokemonList(null);
    setIsLoading(true);

    if (offset > 0) {
      setTimeout(() => {
        setSearchParams({ page: (page - 1).toString() });
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (Number(page) < 1) {
      navigate('/404');
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      const pokemon = pokemonList?.find(pokemon => pokemon.id === Number(id));
      if (pokemon) {
        setSelectedCard(pokemon);
        setIsCardSelected(true);
      }
    } else {
      setSelectedCard(null);
      setIsCardSelected(false);
    }
  }, [id, pokemonList]);

  const handleCardClick = (pokemon: IPokemonDetails) => {
    if (pokemon.id) {
      setSearchParams({ page: page.toString(), details: pokemon.id.toString() });
    }
    setIsCardSelected(true);
    setSelectedCard(pokemon);
  };

  const handleClose = () => {
    setSearchParams({ page: page.toString() });
    setIsCardSelected(false);
    setSelectedCard(null);
  };

  const handelContentSectionClick = () => {
    if (selectedCard) {
      setSearchParams({ page: page.toString() });
      setIsCardSelected(false);
      setSelectedCard(null);
    }
  };

  const handleCheckboxChange = (id: number, isSelected: boolean) =>
    isSelected ? addSelectedValue(id) : deleteSelectedValue(id);

  const handelUnselectAll = () => {
    clearSelectedValue();
  };

  const handelOnDownload = async (): Promise<Datas> => {
    const selectedPokemons: Promise<IPokemonDetails>[] = [];

    selectedItems.forEach(id =>
      selectedPokemons.push(fetchPokemonDetailsBySearch(id).unwrap()),
    );

    try {
      const selectedPokemonsDetails: IPokemonDetails[] =
        await Promise.all(selectedPokemons);
      const data = selectedPokemonsDetails?.map(pokemon => ({
        id: pokemon.id ? `${pokemon.id}` : '',
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat.toString(),
        attack: pokemon.stats
          .find(stat => stat.stat.name === 'attack')
          ?.base_stat.toString(),
        defense: pokemon.stats
          .find(stat => stat.stat.name === 'defense')
          ?.base_stat.toString(),
        specialAttack: pokemon.stats
          .find(stat => stat.stat.name === 'special-attack')
          ?.base_stat.toString(),
        specialDefense: pokemon.stats
          .find(stat => stat.stat.name === 'special-defense')
          ?.base_stat.toString(),
        speed: pokemon.stats
          .find(stat => stat.stat.name === 'speed')
          ?.base_stat.toString(),
        detailsUrl: `${window.location.origin}/?page=${page}&details=${pokemon.id}`,
      }));
      return data;
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      return [];
    }
  };

  return (
    <>
      <div className="button-container">
        <button className="button-next" onClick={handleNextCard}>
          Next
        </button>
        {offset > 0 && (
          <button className="button-previous" onClick={handlePreviousCard}>
            Previous
          </button>
        )}
      </div>
      <div className={`content-section ${isCardSelected ? 'selected-mode' : ''}`}>
        {(isLoading || isLoadingPokemons || !pokemonList) && <LoadingSpinner />}
        <div className="cards-container" onClick={handelContentSectionClick}>
          {pokemonList
            ?.filter(({ name }) => name.includes(searchValue.toLowerCase()))
            .map(pokemonItem => (
              <Card
                {...pokemonItem}
                key={pokemonItem.id}
                onClick={() => {
                  handleCardClick(pokemonItem);
                }}
                selected={!!pokemonItem.id && selectedItems.includes(pokemonItem.id)}
                onSelect={isSelected =>
                  pokemonItem.id !== undefined &&
                  handleCheckboxChange(pokemonItem.id, isSelected)
                }
              />
            ))}
        </div>
        {isCardSelected && selectedCard && (
          <>
            <div className="divider"></div>
            <div className="selected-card-container">
              <SelectedCard pokemon={selectedCard} onClose={handleClose} />
            </div>
          </>
        )}
      </div>
      {selectedItems.length > 0 && (
        <SelectionFlyout
          onUnselectAll={handelUnselectAll}
          generateDownloadData={handelOnDownload}
          selectedItems={selectedItems.length}
        />
      )}
    </>
  );
};

export default ContentSection;
