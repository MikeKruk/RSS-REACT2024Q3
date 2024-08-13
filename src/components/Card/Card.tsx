import ICardProps from '../../types/cardProps';
import styles from '@/components/Card/card.module.css';

const Card: React.FC<ICardProps> = ({
  name,
  sprites,
  stats,
  onClick,
  onSelect,
  selected,
}: ICardProps) => {
  const handleClick = () => (onClick ? onClick() : null);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('git');

    if (onSelect) {
      onSelect(event.target.checked);
    }
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={selected}
          onClick={e => e.stopPropagation()}
          onChange={handleCheckboxChange}
        />
      </div>
      <h3>{name.toLocaleUpperCase()}</h3>
      <img src={sprites.front_default} alt="Pokemon" className={styles.img} />
      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.stat}>
            <span className={styles.name}>{stat.stat.name}:</span>
            <span>{stat.base_stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
