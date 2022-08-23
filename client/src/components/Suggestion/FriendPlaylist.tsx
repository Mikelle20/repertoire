/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
import React from 'react';

type SelectPlaylist = (string: string) => void
interface PropsInterface {
  playlist: {
    playlistId: string
    images: { url: string, width: number, height: number }[]
    checked: boolean
    name: string
  }
  selectPlaylist: SelectPlaylist
}

function FriendPlaylist(props: PropsInterface): JSX.Element {
  const { playlist, selectPlaylist } = props;
  return (
    <div
      tabIndex={0}
      onClick={() => selectPlaylist(playlist.playlistId)}
      className={playlist.checked ? 'friendPlaylistClicked' : 'friendPlaylist'}
    >
      <img alt={playlist.name} src={playlist.images.length !== 0 ? playlist.images[0].url : require('../../assets/defaults/defaultCover.png')} className="searchImg" />
      {playlist.name}
    </div>
  );
}

export default FriendPlaylist;
