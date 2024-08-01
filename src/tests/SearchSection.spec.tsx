import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';

vi.mock('../hooks/useTheme.ts', () => ({
  default: () => ({ isDark: true }),
}));

vi.mock('../../hooks/redux', () => ({
  default: () => ({
    searchValue: '',
  }),
}));

vi.mock('../../hooks/actions', () => ({
  default: () => ({
    setSearchValue: vi.fn(),
  }),
}));

describe('SearchSection', () => {
  test('displays error message for spaces in input', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'text with spaces' } });

    expect(screen.getByText('Search field cannot contain spaces')).toBeInTheDocument();
  });

  test('displays error message for Cyrillic characters in input', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ааа' } });

    expect(
      screen.getByText('Search field cannot contain Cyrillic characters'),
    ).toBeInTheDocument();
  });

  test('clears error message when input is valid', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });
});
