import { render, screen } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

describe('ErrorMessage', () => {
  test('renders the error message', () => {
    const testMessage = 'This is an error message';

    render(<ErrorMessage message={testMessage} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
