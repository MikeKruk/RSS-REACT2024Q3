import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const TestComponent: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  return (
    <div>
      <p data-testid="theme-status">{themeContext.isDark ? 'Dark' : 'Light'}</p>
      <button data-testid="toggle-theme" onClick={themeContext.toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  test('provides initial theme value', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('Dark');
  });

  test('toggles theme value when toggle button is clicked', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const toggleButton = screen.getByTestId('toggle-theme');

    expect(screen.getByTestId('theme-status')).toHaveTextContent('Dark');

    act(() => {
      toggleButton.click();
    });
    expect(screen.getByTestId('theme-status')).toHaveTextContent('Light');

    act(() => {
      toggleButton.click();
    });
    expect(screen.getByTestId('theme-status')).toHaveTextContent('Dark');
  });
});
