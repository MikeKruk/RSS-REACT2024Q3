import { fireEvent, render, screen } from '@testing-library/react';
import SelectedCard from '../components/SelectedCard/SelectedCard';

const mockPokemon = {
  name: 'bulbasaur',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  stats: [
    { base_stat: 45, stat: { name: 'hp' } },
    { base_stat: 49, stat: { name: 'attack' } },
    { base_stat: 49, stat: { name: 'defense' } },
    { base_stat: 65, stat: { name: 'special-attack' } },
    { base_stat: 65, stat: { name: 'special-defense' } },
    { base_stat: 45, stat: { name: 'speed' } },
  ],
  id: 1,
};

describe('SelectedCard', () => {
  test('renders Select pokemon card with pokemon details', () => {
    render(<SelectedCard pokemon={mockPokemon} onClose={() => {}} />);

    expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
    expect(screen.getByAltText('Pokemon')).toHaveAttribute(
      'src',
      mockPokemon.sprites.front_default,
    );
    mockPokemon.stats.map(stat => {
      expect(screen.getAllByText(`${stat.stat.name}:`)).toHaveLength(1);
      expect(screen.getAllByText(stat.base_stat.toString())).toHaveLength(2);
    });
  });

  test('calls onClose', () => {
    const onCloseMock = vi.fn();

    render(<SelectedCard pokemon={mockPokemon} onClose={onCloseMock} />);

    fireEvent.click(screen.getByText('×'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
