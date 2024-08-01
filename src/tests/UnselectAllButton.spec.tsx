import { render, screen, fireEvent } from '@testing-library/react';
import UnselectAllButton from '../components/UnselectAllButton';

describe('UnselectAllButton', () => {
  test('renders with correct text', () => {
    render(<UnselectAllButton onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Unselect all');
  });

  test('calls onClick when button is clicked', () => {
    const onClickMock = vi.fn();
    render(<UnselectAllButton onClick={onClickMock} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
