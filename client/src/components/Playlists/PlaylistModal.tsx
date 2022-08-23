/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { SyntheticEvent } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { closeModal } from '../../features/PlaylistModalSlice';
import SearchFriends from '../Suggestion/SearchFriends';
import { setError } from '../../features/errorSlice';

type func = () => void
interface PropsInterface {
  friends: {
    user_id: string
    checked: boolean
    display_name: string
    profile_image: string
  }[]
  renderPlaylists: func
}

function PlaylistModal(props: PropsInterface) {
  const { friends, renderPlaylists } = props;
  const dispatch = useDispatch();
  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    isPrivate: false,
    accessList: [],
  });

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [searchFriends, setSearchFriends] = React.useState(friends);

  React.useEffect(() => {
    if (!formData.isPrivate) {
      setFormData((prevState) => ({
        ...prevState,
        accessList: [],
      }));
    }
  }, [formData.isPrivate]);

  const handleChange = (Event: SyntheticEvent) => {
    setFormData((prevState) => {
      const {
        value, name, type, checked,
      } = Event.target as HTMLInputElement;
      return {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleSubmit = async (Event: React.FormEvent) => {
    Event.preventDefault();
    dispatch(closeModal());
    await axios({
      method: 'POST',
      url: '/playlist/createPlaylist',
      withCredentials: true,
      headers,
      data: { formData },
    }).then((): void => {
      renderPlaylists();
    })
      .catch((): void => {
        dispatch(setError(true));
      });
  };

  const handleClick = (id: string): void => {
    const idExists = formData.accessList.includes(id);

    if (idExists) {
      setFormData((prevState) => {
        const newList = prevState.accessList.filter((element) => element !== id);
        return {
          ...prevState,
          accessList: newList,
        };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        accessList: [...formData.accessList, id],
      }));
    }

    setSearchFriends((prevState) => prevState.map((friend) => (friend.user_id === id ? { ...friend, checked: !friend.checked } : friend)));
  };

  const friendIcons = searchFriends.map((friend) => (
    <SearchFriends
      key={friend.user_id}
      friend={friend}
      handleClick={handleClick}
    />
  ));
  return (
    <motion.div
      className="playlistModal"
    >
      <form
        onSubmit={handleSubmit}
        className="playlistModalForm"
      >
        <div className="inputModalContainer">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="authInput"
          />
        </div>
        <div className="inputModalContainer">
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="authInput"
          />
        </div>
        <div className="isPrivateContainer">
          <input
            type="checkbox"
            id="isPrivate"
            name="isPrivate"
            checked={formData.isPrivate}
            onChange={handleChange}
          />
          <label htmlFor="isPrivate">Private?</label>
        </div>
        {formData.isPrivate
          && (
          <div className="modalFriends">
            {friendIcons}
          </div>
          )}
        <div className="modalButtonContainer">
          <motion.button
            tabIndex={0}
            whileTap={{ scale: 0.9 }}
            className="modalBtn"
            onClick={() => dispatch(closeModal())}
          >
            Close

          </motion.button>
          {formData.title && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            tabIndex={0}
            onSubmit={handleSubmit}
            id="modalClose"
            className="modalBtn"
          >
            Create
          </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

export default PlaylistModal;
