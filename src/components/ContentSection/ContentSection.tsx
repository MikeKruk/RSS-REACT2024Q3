import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Card from '../Card/Card';
import IPokemonDetails from '../../types/Pokemon/PokemonDetails';
import SelectedCard from '../SelectedCard/SelectedCard';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppContext } from '../../hooks/useAppContext';
import { getPokemonsList } from '../../context/action/action';
import './ContentSection.css';
import { useNavigate, useParams } from 'react-router-dom';

const ContentSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemonList = useAppContext(state => state.pokemonList);
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedCard, setSelectedCard] = useState<IPokemonDetails | null>(null);
  const [isCardSelected, setIsCardSelected] = useState(false);

  const handleNextCard = () => {
    setIsLoading(true);
    const nextPage = offset / 20 + 1;
    navigate(`/?page=${nextPage}`);

    setTimeout(() => {
      setOffset(offset + 20);
      setIsLoading(false);
    }, 500);
  };

  const handlePreviousCard = () => {
    setIsLoading(true);
    const prevPage = offset / 20 - 1;
    navigate(`/?page=${prevPage}`);

    if (offset > 0) {
      setTimeout(() => {
        setOffset(offset - 20);
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getPokemonsList(offset, dispatch);
  }, [offset]);

  const handleCardClick = (pokemon: IPokemonDetails) => {
    setIsCardSelected(true);
    setSelectedCard(pokemon);
    navigate(`/?page=${params.page}&details=${pokemon.id}`);
  };

  const handleClose = () => {
    setIsCardSelected(false);
    setSelectedCard(null);
  };

  const handelContentSectionClick = () => {
    if (selectedCard) {
      setIsCardSelected(false);
      setSelectedCard(null);
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
          {pokemonList.map((pokemonItem, index) => (
            <Card
              {...pokemonItem}
              key={index}
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
