import IPropsErrorMessage from '../../types/ErrorMessage/propsErrorMessage';
import styles from '@/components/ErrorMessage/errorMessage.module.css';

const ErrorMessage: React.FC<IPropsErrorMessage> = ({ message }) => {
  return <div className={styles.message}>{message}</div>;
};

export default ErrorMessage;
