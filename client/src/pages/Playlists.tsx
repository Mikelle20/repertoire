/* eslint-disable max-len */
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Playlist from '../components/Playlists/Playlist';
import PlaylistModal from '../components/Playlists/PlaylistModal';
import { openModal } from '../features/PlaylistModalSlice';

function Playlists(): JSX.Element {
  interface TokenInterface {
    token: string
    exp: number
  }

  interface ErrorInterface {
    error: {
      error: {
        isError: boolean
        error: string
      }
    }
  }

  interface PlaylistModalInterface {
    playlistModal: {
      isOpen: boolean
    }
  }

  interface PlaylistInterface {
    id: string
    title: string
    isPrivate: boolean
    images: {
      width: number
      height: number
      url: string
    }[]

  }

  interface FriendInterface{
    user_id: string
    profile_image: string
    rating: number
    display_name: string
    checked: boolean
  }

  const stringifiedToken: string = window.sessionStorage.getItem('accessToken') || '{}';
  const accessToken: TokenInterface = JSON.parse(stringifiedToken);
  if (!accessToken) window.location.href = '/login';

  const { isOpen } = useSelector((store: PlaylistModalInterface) => store.playlistModal);

  const headers = {
    Authorization: `Bearer ${accessToken.token}`,
  };

  const { error } = useSelector((store: ErrorInterface) => store.error);
  const [playlists, setPlaylists] = React.useState<PlaylistInterface[]>([]);
  const [friends, setFriends] = React.useState<FriendInterface[]>([]);
  const [newPlaylist, setNewPlaylist] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios.get('/friends/getFriends', { withCredentials: true, headers }).then((res): void => {
      setFriends(res.data);
    });

    axios.get('/playlist/getPlaylists', { withCredentials: true, headers }).then((res): void => {
      setPlaylists(res.data.reverse());
    });
  }, [newPlaylist]);

  const removePlaylist = (id: string): void => {
    setPlaylists((prev): PlaylistInterface[] => prev.filter((playlist: PlaylistInterface) => playlist.id !== id));
  };

  const renderPlaylists = () => {
    setNewPlaylist((prev: boolean): boolean => !prev);
  };

  const playlistCards = playlists.map((playlist: PlaylistInterface) => <Playlist key={playlist.id} removePlaylist={removePlaylist} playlist={playlist} />);
  return (
    <div className="landingContainer">
      {error.isError
        ? <div className="loadingScreen">{error.error}</div>
        : (
          <div className="pageContainer">
            {isOpen && <PlaylistModal renderPlaylists={renderPlaylists} friends={friends} />}
            <div className="playlistContainer">
              {playlists && playlistCards}
              {accessToken && (
              <motion.button
                tabIndex={0}
                className="newPlaylistBtn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(openModal())}
              >
                <img alt="" src={require('../assets/icons/newPlaylist.png')} />
              </motion.button>
              )}
            </div>
          </div>
        )}
    </div>
  );
}

export default Playlists;
