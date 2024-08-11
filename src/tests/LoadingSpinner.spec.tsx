import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import loadingGif from '../assets/loading-spinner.gif';

describe('LoadingSpinner', () => {
  test('renders the loading spinner with the correct image and alt text', () => {
    render(<LoadingSpinner />);

    const imgElement = screen.getByAltText('Loading');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', loadingGif);
  });
});
