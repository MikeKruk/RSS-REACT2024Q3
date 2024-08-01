import { renderHook } from '@testing-library/react';
import { ThemeContext } from '../context/ThemeContext';
import useTheme from '../hooks/useTheme';
import { ReactNode } from 'react';

const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={{ isDark: true, toggleTheme: () => {} }}>
    {children}
  </ThemeContext.Provider>
);

describe('useTheme hook', () => {
  it('should return the context value', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.isDark).toBe(true);
    expect(typeof result.current.toggleTheme).toBe('function');
  });
});
