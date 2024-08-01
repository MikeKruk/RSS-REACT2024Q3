import { render, screen, fireEvent } from '@testing-library/react';
import SelectionFlyout from '../components/SelectionFlyout/SelectionFlyout';

vi.mock('react-csv-downloader', () => ({
  default: (props: { datas: () => void; text: string }) => (
    <button onClick={props.datas}>{props.text}</button>
  ),
}));

vi.mock('../components/UnselectAllButton', () => ({
  default: (props: { onClick: () => void }) => (
    <button onClick={props.onClick}>Unselect all</button>
  ),
}));

describe('SelectionFlyout', () => {
  const mockSelectedItems = 5;
  const mockOnUnselectAll = vi.fn();
  const mockGenerateDownloadData = vi
    .fn()
    .mockReturnValue([{ id: 1, name: 'Bulbasaur' }]);

  beforeEach(() => {
    render(
      <SelectionFlyout
        selectedItems={mockSelectedItems}
        onUnselectAll={mockOnUnselectAll}
        generateDownloadData={mockGenerateDownloadData}
      />,
    );
  });

  test('renders selected items count', () => {
    expect(screen.getByText(`Selected items: ${mockSelectedItems}`)).toBeInTheDocument();
  });

  test('renders Unselect All button and handles click', () => {
    const unselectAllButton = screen.getByText('Unselect all');
    expect(unselectAllButton).toBeInTheDocument();

    fireEvent.click(unselectAllButton);
    expect(mockOnUnselectAll).toHaveBeenCalled();
  });

  test('renders Download button with correct settings', () => {
    const downloadButton = screen.getByText('Download');
    expect(downloadButton).toBeInTheDocument();

    fireEvent.click(downloadButton);
    expect(mockGenerateDownloadData).toHaveBeenCalled();
  });
});
