import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFriends, setSuggestions } from '../features/playlistSlice';
import PlaylistContainer from '../components/Playlists/PlaylistContainer';
import { setError } from '../features/errorSlice';

function Playlist(): JSX.Element {
  interface TokenInterface {
    token: string
    exp: number
  }

  interface StoreInterface {
    error: {
      error: {
        isError: boolean
        error: string
      }
    }
  }

  interface PlaylistInterface {
    playlist: {
      playlist: {
        isPrivate: boolean
      }
    } // check playlist data structure
  }

  const stringifiedToken: string = window.sessionStorage.getItem('accessToken') || '{}';
  const accessToken: TokenInterface = JSON.parse(stringifiedToken);
  if (!accessToken) window.location.href = '/login';

  const playlistId = window.location.pathname.split('/').at(-1);

  const { playlist } = useSelector((store: PlaylistInterface) => store.playlist);
  const { error } = useSelector((store: StoreInterface) => store.error);

  const headers = {
    Authorization: `Bearer ${accessToken.token}`,
  };
  const dispatch = useDispatch();

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.post('/suggestion/getSuggestions', { playlistId }, { withCredentials: true, headers }).then((res) => {
      dispatch(setSuggestions(res.data.reverse()));
    }).catch((): void => {
      dispatch(setError(true));
    });

    axios.post('/playlist/friendsAccess', { playlistInfo: { playlistId, isPrivate: playlist.isPrivate } }, { withCredentials: true, headers }).then((res) => {
      dispatch(setFriends(res.data));
    }).catch((): void => {
      dispatch(setError(true));
    });
    axios.post('/playlist/getPlaylist', { playlistId }, { withCredentials: true, headers }).then((res) => {
      // console.log(res.data);
      if (res.data.ownership === false) {
        window.location.href = '/home';
      } else {
        setData(res.data);
      }
    }).catch((): void => {
      dispatch(setError(true));
    });
  }, []);

  return (
    <div className="pageContainer">
      {error.isError
        ? <div className="loadingScreen">{error.error}</div>
        : (
          <div className="container">
            {data && <PlaylistContainer playlist={data} playlistId={playlistId} />}
          </div>
        )}
    </div>
  );
}

export default Playlist;
