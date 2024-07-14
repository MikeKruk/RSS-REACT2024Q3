interface IPokemonDetails {
  pokemon: {
    name: string;
    sprites: {
      front_default: string;
    };
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
  };
}

export default IPokemonDetails;
