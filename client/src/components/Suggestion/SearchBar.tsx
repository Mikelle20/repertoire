import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../../features/errorSlice';
import SearchResult from './SearchResult';

function SearchBar(): JSX.Element {
  const [formData, setFormData] = React.useState<{search: string}>({
    search: '',
  });
  const dispatch = useDispatch();
  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [tracks, setTracks] = React.useState([]);

  React.useEffect((): void => {
    axios({
      method: 'POST',
      url: '/suggestion/search',
      data: formData,
      withCredentials: true,
      headers,
    }).then((res): void => {
      setTracks(res.data);
    }).catch((): void => {
      dispatch(setError(true));
    });
  }, [formData.search]);

  const handleChange = (Event: React.SyntheticEvent) => {
    const target = Event.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const searches = tracks.map((track) => (
    <SearchResult
      key={track.songId}
      track={track}
    />
  ));
  return (
    <div className="searchContainer">
      <div className="searchInputContainer">
        <input
          tabIndex={0}
          className="searchInput"
          name="search"
          placeholder="Song + Artist..."
          value={formData.search}
          onChange={handleChange}
        />
        <span>
          <img alt="search" src={require('../../assets/icons/search.png')} className="searchIcon" />
        </span>
      </div>
      {formData.search.length !== 0
            && (
            <div className="searchResultsContainer">
              {searches.length === 0 ? <span className="noResultsText">No Results Found</span> : searches}
            </div>
            )}
    </div>
  );
}

export default SearchBar;
