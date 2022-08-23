import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/Suggestion/SearchBar';
import { setFriends } from '../features/friendsSlice';
import SearchModal from '../components/Suggestion/SearchModal';
import { setError } from '../features/errorSlice';

function Suggestion(): JSX.Element {
  interface ErrorInterface {
    error: {
      error: {
        isError: boolean
        error: string
      }
    }
  }

  interface TokenInterface {
    token: string
    exp: number
  }

  interface ModalStoreInterface {
    searchModal: {
      playlist: object // check
      isOpen: boolean
    }
  }

  const stringifiedToken: string | null = window.sessionStorage.getItem('accessToken') || null;
  const accessToken: TokenInterface = JSON.parse(stringifiedToken);
  if (!accessToken) window.location.href = '/login';

  const { isOpen } = useSelector((store: ModalStoreInterface) => store.searchModal);
  const { error } = useSelector((store: ErrorInterface) => store.error);
  const dispatch = useDispatch();

  const headers = {
    Authorization: `Bearer ${accessToken.token}`,
  };

  React.useEffect((): void => {
    axios.get(
      '/friends/getFriends',
      { withCredentials: true, headers },
    ).then((res) => {
      dispatch(setFriends(res.data));
    }).catch((): void => {
      dispatch(setError(true));
    });
  }, []);
  return (
    <div className="landingContainer">
      {error.isError
        ? <div className="loadingScreen">{error.error}</div>
        : (
          <div className="pageContainer">
            {isOpen && <SearchModal />}
            <SearchBar />
          </div>
        )}
    </div>
  );
}

export default Suggestion;
