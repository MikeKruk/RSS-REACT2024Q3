import CsvDownloader from 'react-csv-downloader';
import ISelectedFlyout from '../../types/selectedFlyout';
import UnselectAllButton from '../UnselectAllButton';
import styles from '@/components/SelectionFlyout/selectionFlyout.module.css';

const SelectionFlyout: React.FC<ISelectedFlyout> = ({
  selectedItems,
  onUnselectAll,
  generateDownloadData,
}) => {
  const columns = [
    { id: 'id', displayName: 'ID' },
    { id: 'name', displayName: 'Name' },
    { id: 'image', displayName: 'Image' },
    { id: 'hp', displayName: 'Hp' },
    { id: 'attack', displayName: 'Attack' },
    { id: 'defense', displayName: 'Defense' },
    { id: 'specialAttack', displayName: 'Special-attack' },
    { id: 'specialDefense', displayName: 'Special-defense' },
    { id: 'speed', displayName: 'Speed' },
    { id: 'detailsUrl', displayName: 'Details URL' },
  ];

  return (
    <div className={styles.flyout}>
      <h3>Selected items: {selectedItems}</h3>
      <div className={styles.container}>
        <UnselectAllButton onClick={onUnselectAll} />
        <CsvDownloader
          filename={`${selectedItems}_pokemons.csv`}
          extension=".csv"
          columns={columns}
          wrapColumnChar=""
          datas={generateDownloadData}
          text="Download"
        />
      </div>
    </div>
  );
};

export default SelectionFlyout;
