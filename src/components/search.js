import '../styles/components/Search.scss';
import { searchPlaces } from '../api';
import { useContext, useState } from 'react';
import WeatherContext from '../context/Weather.context';

function Search() {
  const { setPlace } = useContext(WeatherContext);
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [openSearchResults, setOpenSearchResults] = useState(false);

  async function onSearch(e) {
    const value = e.target.value;
    setText(value);

    if (value.trim() === '') {
      setSearchResults([]);
      setOpenSearchResults(false);
      return;
    }

    const data = await searchPlaces(value);
    

    // ✅ Crash-proof check
    if (!Array.isArray(data)) {
      setSearchResults([]);
      setOpenSearchResults(false);
      return;
    }

    const sortedData = data.sort((a, b) => {
      const query = value.toLowerCase();
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      const aStarts = aName.startsWith(query) ? -1 : 1;
      const bStarts = bName.startsWith(query) ? -1 : 1;

      if (aStarts !== bStarts) return aStarts - bStarts;
      return aName.localeCompare(bName);
    });

    setSearchResults(sortedData);
    setOpenSearchResults(sortedData.length > 0);
  }

  const changePlace = (place) => {
    setPlace(place);
    setText('');
    setOpenSearchResults(false);
  };

  return (
    <div className="search-container">
      <div className="search-icon">
        <i className='bi bi-search'></i>
      </div>
      <div className="search-input">
        <input
          type="text"
          name="search-city"
          placeholder="Search city..."
          value={text}
          onChange={onSearch}
        />
      </div>

      {openSearchResults && searchResults.length > 0 && (
        <div className='search-results'>
          <div className='results-container'>
            {searchResults.map((place) => (
              <div
                className='result'
                key={place.place_id}
                onClick={() => changePlace(place)}
              >
                {place.name}, {place.adm_area1}, {place.country}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
