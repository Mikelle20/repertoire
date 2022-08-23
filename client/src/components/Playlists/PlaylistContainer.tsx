/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import PlaylistFriend from './PlaylistFriend';
import Suggestion from './Suggestion';

interface PropsInterface {
  playlist: {
    name: string
    images: {url: string, width: number, height: number}[]
    description: string
  }
  playlistId: string
}

function PlaylistContainer(props: PropsInterface) {
  interface SuggestionInterface {
    rating: number
    senderId: string
    songId: string
    songName: string
    songImage: string
    senderImage: string
    senderName: string
  }

  interface PlaylistStoreInterface {
    playlist: {
      playlistFriends: []
      playlistSuggestions: SuggestionInterface[]
    }
  }

  const { playlist, playlistId } = props;
  const { playlistFriends, playlistSuggestions } = useSelector((store: PlaylistStoreInterface) => store.playlist);
  const suggestions = playlistSuggestions.map((suggestion) => <Suggestion key={suggestion.songId} suggestion={suggestion} playlistId={playlistId} />);
  const friendIcons = playlistFriends.map((friend: {profile_image: string, display_name: string, user_id: string}) => <PlaylistFriend key={friend.user_id} friend={friend} />);
  return (
    <motion.div drag dragSnapToOrigin className="playContainer">
      <div className="leftPlayContainer">
        <motion.img whileHover={{ scale: 1.1 }} src={playlist.images.length === 0 ? require('../../assets/defaults/defaultCover.png') : playlist.images[0].url} className="playlistPageCover" />
        <motion.div whileHover={{ scale: 1.1 }} className="playlistTitle">{playlist.name}</motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="playlistDescription">{playlist.description}</motion.div>
        <div className="playlistFriendsContainer">
          {friendIcons.length !== 0
            ? friendIcons
            : <div className="emptyMessage">No Friends</div>}
        </div>
      </div>
      <div className="rightPlayContainer">
        <div className="suggestContainer">
          {suggestions.length !== 0
            ? suggestions
            : <div className="emptyMessage">No Suggestions</div>}
        </div>
      </div>
    </motion.div>
  );
}

export default PlaylistContainer;
