/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { closeModal } from '../../features/searchModalSlice';
import SearchFriends from './SearchFriends';
import FriendPlaylist from './FriendPlaylist';
import { setError } from '../../features/errorSlice';

function SearchModal(): JSX.Element {
  interface SearchStoreInterface {
    searchModal: {
      search: {
        songId: string
        title: string
        cover: string
        artist: string
        explicit: boolean
      }
    }
  }

  interface FriendInterface {
    user_id: string
    checked: boolean
    profile_image: string
    display_name: string
  }

  interface FriendPlaylistInterface {
    playlistId: string
    images: { url: string, width: number, height: number }[]
    checked: boolean
    name: string
  }

  interface FriendsStoreInterface {
    friends: {
      friends: FriendInterface[]
    }
  }

  const { search } = useSelector((store: SearchStoreInterface) => store.searchModal);
  const { friends } = useSelector((store: FriendsStoreInterface) => store.friends);
  const dispatch = useDispatch();

  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [formData, setFormData] = React.useState<{song_id: string, friend_id: string, playlist_id: string}>({
    song_id: search.songId,
    friend_id: '',
    playlist_id: '',
  });

  const [friendPlaylists, setFriendPlaylists] = React.useState<FriendPlaylistInterface[]>([]);

  const [modalFriends, setModalFriends] = React.useState<FriendInterface[]>(friends);

  React.useEffect((): void => {
    if (formData.friend_id) {
      axios({
        method: 'POST',
        url: '/suggestion/accessedPlaylists',
        withCredentials: true,
        headers,
        data: { friend: formData.friend_id },
      }).then((res): void => {
        setFriendPlaylists(res.data);
      }).catch((): void => {
        dispatch(setError(true));
      });
    }
  }, [formData.friend_id]);

  const handleClick = (id: string) => {
    setFormData((prevState) => ({
      ...prevState,
      friend_id: prevState.friend_id === id ? '' : id,
    }));

    setModalFriends((prevState) => prevState.map((friend: FriendInterface) => (friend.user_id === id ? { ...friend, checked: !friend.checked } : { ...friend, checked: false })));
  };

  const selectPlaylist = (id: string): void => {
    setFormData((prevState) => ({
      ...prevState,
      playlist_id: prevState.playlist_id === id ? '' : id,
    }));

    setFriendPlaylists((prevState) => prevState.map((playlist) => (playlist.playlistId === id ? { ...playlist, checked: !playlist.checked } : { ...playlist, checked: false })));
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/suggestion/suggest',
      withCredentials: true,
      headers,
      data: { ...formData },
    }).then((): void => {
      dispatch(closeModal());
    }).catch((): void => {
      dispatch(setError(true));
    });
  };

  const friendIcons = modalFriends.map((friend) => (
    <SearchFriends
      key={friend.user_id}
      friend={friend}
      handleClick={handleClick}
    />
  ));

  const friendPlaylistIcons = friendPlaylists.map((element) => (
    <FriendPlaylist
      key={element.playlistId}
      playlist={element}
      selectPlaylist={selectPlaylist}
    />
  ));
  return (
    <motion.div
      className="searchModal"
    >
      <div className="searchModalTop">
        <img alt={search.title} src={search.cover} className="searchModalImg" />
        <div className="searchModalText">
          {search.title.length >= 15 ? `${search.title.split(' ').slice(0, 3).join(' ')}...` : search.title}
          {' '}
          {search.explicit && <img alt="explicit" src={require('../../assets/icons/explicit.png')} className="modalPng" />}
        </div>
        <div className="searchModalText">{search.artist}</div>
      </div>
      <div className="searchModalBottom">
        <div className="modalFriends">
          {friendIcons.length === 0 ? <span className="empty">No Friends Yet</span> : friendIcons}
        </div>
      </div>
      {formData.friend_id
          && (
          <div className="modalFriendsPlaylists">
            {friendPlaylistIcons.length === 0 ? <span className="empty">No Playlists Yet</span> : friendPlaylistIcons}
          </div>
          )}
      <div className="buttonModalContainer">
        <motion.button
          tabIndex={0}
          style={{ marginRight: '20%' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(closeModal())}
          className="modalBtn"
        >
          Close
        </motion.button>
        {formData.playlist_id && (
          <motion.button
            tabIndex={0}
            whileTap={{ scale: 0.9 }}
            onClick={handleSubmit}
            className="modalBtn"
          >
            Add
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default SearchModal;
