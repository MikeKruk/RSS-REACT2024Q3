import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Card from '../Card/Card';
import IPokemonDetails from '../../types/Pokemon/PokemonDetails';
import SelectedCard from '../SelectedCard/SelectedCard';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppContext } from '../../hooks/useAppContext';
import { getPokemonsList } from '../../context/action/action';
import './ContentSection.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ContentSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemonList = useAppContext(state => state.pokemonList);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IPokemonDetails | null>(null);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page')) || 1;
  const id = Number(searchParams.get('details'));
  const offset = (page - 1) * 20;

  const handleNextCard = () => {
    setIsLoading(true);

    setTimeout(() => {
      setSearchParams({ page: (page + 1).toString() });
      setIsLoading(false);
    }, 500);
  };

  const handlePreviousCard = () => {
    console.log(page === Number(searchParams.get('page')), typeof page, isNaN(page));

    setIsLoading(true);

    if (offset > 0) {
      setTimeout(() => {
        setSearchParams({ page: (page - 1).toString() });
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getPokemonsList(offset, dispatch);
  }, [offset, page]);

  useEffect(() => {
    if (Number(page) < 1) {
      navigate('/404');
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      const pokemon = pokemonList.find(pokemon => pokemon.id === Number(id));
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
      console.log(id);
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
        {isLoading && <LoadingSpinner />}
        <div className="cards-container" onClick={handelContentSectionClick}>
          {pokemonList.map(pokemonItem => (
            <Card
              {...pokemonItem}
              key={pokemonItem.id}
              onClick={() => {
                handleCardClick(pokemonItem);
              }}
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
    </>
  );
};

export default ContentSection;
