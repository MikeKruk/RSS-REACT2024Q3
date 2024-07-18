import IPokemonDetails from './Pokemon/PokemonDetails';

interface ICardProps extends IPokemonDetails {
  onClick?: () => void;
}
export default ICardProps;
