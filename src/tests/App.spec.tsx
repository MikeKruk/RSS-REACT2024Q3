import { render } from '@testing-library/react';
import App from '../App';

vi.mock('../hooks/useTheme.ts', () => ({
  default: () => ({ isDark: true }),
}));

describe('App', () => {
  test('render App component', () => {
    render(<App />);

    const containerElement = document.querySelector('.container');
    expect(containerElement).toBeInTheDocument();
  });
});
