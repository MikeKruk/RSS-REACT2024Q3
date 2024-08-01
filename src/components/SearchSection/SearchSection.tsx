import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ButtonError from '../ButtonError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { HAS_CYRILLIC, HAS_SPACES } from '../../constants/validationConstants';
import './searchSection.css';
import useAppSelector from '../../hooks/redux';
import useActions from '../../hooks/actions';

const SearchSection: React.FC = () => {
  const { searchValue } = useAppSelector(state => state.search);
  const { setSearchValue } = useActions();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    localStorage.setItem('searchValue', event.target.value);
    if (HAS_SPACES.test(event.target.value)) {
      setErrorMessage('Search field cannot contain spaces');
      setIsLoading(false);
    } else if (HAS_CYRILLIC.test(event.target.value)) {
      setErrorMessage('Search field cannot contain Cyrillic characters');
      setIsLoading(false);
    } else {
      setErrorMessage('');
    }
  };

  const onClick = () => {
    console.log('Error simulation');
  };

  return (
    <>
      <div className="search-section">
        <fieldset className="search-section_container">
          <legend className="search-section_legend">Find your pokemon</legend>
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search"
          />
        </fieldset>
        <button className="search-section_button">Search</button>
        <ButtonError onClick={onClick}></ButtonError>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage}></ErrorMessage>}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default SearchSection;
