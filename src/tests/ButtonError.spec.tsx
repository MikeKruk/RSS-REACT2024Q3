import { render, screen } from '@testing-library/react';
import ButtonError from '../components/ButtonError';

describe('ButtonError', () => {
  test('renders button with "Check error" text', () => {
    render(<ButtonError onClick={() => {}} />);
    expect(screen.getByText('Check error')).toBeInTheDocument();
  });
});
