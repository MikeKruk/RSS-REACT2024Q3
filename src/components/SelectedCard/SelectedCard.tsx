import ISelectedPokemonDetails from '../../types/Pokemon/selectedPokemonDetails';
import Card from '../Card/Card';
import styles from '@/components/SelectedCard/selectedCard.module.css';

const SelectedCard: React.FC<ISelectedPokemonDetails> = ({ pokemon, onClose }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClose}>
        ×
      </button>
      <Card {...pokemon} selected={true} />
    </div>
  );
};

export default SelectedCard;
