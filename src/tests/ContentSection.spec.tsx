import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { RouterProvider } from 'react-router-dom';
import router from '../router/router';

vi.mock('../hooks/useTheme.ts', () => ({
  default: () => ({ isDark: true }),
}));

describe('ContentSection', () => {
  test('renders the specified number of cards', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    await waitFor(() => {
      const cards = document.querySelectorAll('.pokemon-card');
      expect(cards).toHaveLength(20);
    });
  });
});
