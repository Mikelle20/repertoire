/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import FriendResult from './FriendResult';
import { setError } from '../../features/errorSlice';

function FriendSearchBar(): JSX.Element {
  interface StoreInterface {
    error: {
      error: {
        isError: boolean
        error: string
      }
    }
  }

  interface FriendInterface {
    profile_image: string
    display_name: string
    status: number
    user_id: string
  }
  const [formData, setFormData] = React.useState<{search: string}>({
    search: '',
  });

  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
  const { error } = useSelector((store: StoreInterface) => store.error);
  const dispatch = useDispatch();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [friendsResults, setFriendsResults] = React.useState<FriendInterface[]>([]);
  const [updateStatus, setUpdateStatus] = React.useState<number>(0);

  const handleSubmit = (id: string): void => {
    axios.post(
      '/friends/addFriend',
      { friend: id },

      { withCredentials: true, headers },
    ).then((): void => {
      setUpdateStatus((prev) => {
        const count = prev + 1;
        return count;
      });
    }).catch((): void => {
      dispatch(setError(true));
    });
  };

  const handleDelete = (id: string) => {
    axios({
      method: 'DELETE',
      url: '/friends/deleteFriend',
      withCredentials: true,
      headers,
      data: { friend: id },
    }).then((): void => {
      setUpdateStatus((prev) => prev - 1);
    }).catch((): void => {
      dispatch(setError(true));
    });
  };

  React.useEffect((): void => {
    if (formData.search.length) {
      axios.post('/friends/searchFriends', formData, { withCredentials: true, headers }).then((res): void => {
        setFriendsResults(res.data);
      }).catch((): void => {
        dispatch(setError(true));
      });
    }
  }, [formData.search, updateStatus]);

  const handleChange = (Event: React.SyntheticEvent): void => {
    const target = Event.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const searches = friendsResults.map((friend) => <FriendResult key={friend.user_id} friend={friend} addFriend={handleSubmit} deleteFriend={handleDelete} />);
  return (
    <div>
      {error.isError
        ? (
          <div className="pageContainer">
            <div className="loadingScreen">
              {error.error}
            </div>
          </div>
        )
        : (
          <div className="searchContainer">
            <div className="searchInputContainer">
              <input
                className="searchInput"
                name="search"
                placeholder="Enter Spotify Username..."
                value={formData.search}
                onChange={handleChange}
              />
              <span>
                <img alt="search icon" src={require('../../assets/icons/search.png')} className="searchIcon" />
              </span>
            </div>
            {formData.search.length !== 0
              && (
              <div className="friendResultsContainer">
                {searches.length === 0 ? <span className="noResultsText">No Results Found</span> : searches}
              </div>
              )}
          </div>
        )}
    </div>
  );
}

export default FriendSearchBar;
