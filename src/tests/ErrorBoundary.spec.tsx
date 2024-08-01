import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

vi.mock('../components/ButtonTryAgain', () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Try Again</button>
  ),
}));

describe('ErrorBoundary', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  test('renders error message and button when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(
      screen.getByText('Sorry, an error occurred, we are working on it'),
    ).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
});
