import { render, screen } from '@testing-library/react';
import ButtonTryAgain from '../components/ButtonTryAgain';

describe('ButtonTryAgain', () => {
  test('render ButtonTryAgain', () => {
    render(<ButtonTryAgain onClick={() => {}} />);

    expect(screen.getByRole('button')).toBeInTheDocument;
  });
});
