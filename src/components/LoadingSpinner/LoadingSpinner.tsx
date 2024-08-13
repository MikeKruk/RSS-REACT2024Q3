import Image from 'next/image';
import loadingGif from '../../assets/loading-spinner.gif';
import styles from '@/components/LoadingSpinner/loadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image src={loadingGif} alt="Loading" className="loading-spinner_img" />
    </div>
  );
};

export default LoadingSpinner;
