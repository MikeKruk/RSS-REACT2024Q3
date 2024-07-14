import IPokemonDetails from '../../types/Pokemon/PokemonDetails';
import './Card.css';

const Card: React.FC<IPokemonDetails> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <h3>{pokemon.name.toLocaleUpperCase()}</h3>
      <img
        src={pokemon.sprites.front_default}
        alt="Pokemon"
        className="pokemon-card_img"
      />
      <div className="pokemon-stats">
        {pokemon.stats.map((stat, index) => (
          <div key={index} className="stat">
            <span className="stat-name">{stat.stat.name}:</span>
            <span className="stat-value">{stat.base_stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
