import { fireEvent, render, screen } from '@testing-library/react';
import ButtonError from '../components/ButtonError';

describe('ButtonError', () => {
  test('renders button with "Check error" text', () => {
    render(<ButtonError onClick={() => {}} />);
    expect(screen.getByText('Check error')).toBeInTheDocument();
  });

  test('throws error when hasError is true', () => {
    const handleClick = vi.fn();
    render(<ButtonError onClick={handleClick} />);
    expect(() => {
      fireEvent.click(screen.getByText('Check error'));
    }).toThrow('This is a test error thrown intentionally!');
  });
});
