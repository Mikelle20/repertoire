/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import SocialItem from './SocialItem';
import SideItem from './SideItem';
import SuggestionItem from './SuggestionItem';
import PlaylistItem from './PlaylistItem';
import PlaylistFriend from '../Playlists/PlaylistFriend';
import RecentItem from './RecentItem';
import TrackItems from './TrackItems';

function HomeContainer(props): JSX.Element {
  const { data, socials } = props;
  console.log(socials);
  const time = new Date();
  const hours = time.getHours();

  let greeting: string;

  if (hours > 4 && hours < 12) greeting = 'Morning';
  if (hours >= 12 && hours < 18) greeting = 'Afternoon';
  if (hours <= 4 || hours >= 18) greeting = 'Evening';

  const artists = data.items.map((artist: { id: string; name: string; images: { url: string; width: number; height: number; }[]; }) => (
    <SideItem
      artist={artist}
      key={artist.id}
    />
));

  const suggestions = data.homeSuggestions.map((suggestion: { playlistId: string; songName: string; senderName: string; senderImage: string; songImage: { url: string; width: number; height: number; }[]; }) => <SuggestionItem key={nanoid()} suggestion={suggestion} />);

  const listens = data.friendListens.map((listen: { friendName: string; songName: string; songImage: string; friendImage: string; }) => <RecentItem key={nanoid()} listen={listen} />);

  const playlists = data.homePlaylists.map((playlist: { playlistId: string; playlistName: string; playlistImage: { url: string; width: number; height: number; }[]; isPrivate: boolean; }) => <PlaylistItem key={nanoid()} playlist={playlist} />);

  const socialItems = socials.socials.map((social: { senderImage: string; senderName: string; ownerName: string; songName: string; playlistName: string; rating: number; type: boolean; ownerImage: string; }) => <SocialItem key={nanoid()} social={social} />);

  const friendIcons = socials.friends.map((friend: { profile_image: string; display_name: string; user_id: string; }) => <PlaylistFriend key={nanoid()} friend={friend} />);

  const tracks = data.tracks.map((track: { name: string; album: { images: { url: string; width: number; height: number; }[]; }; }) => <TrackItems key={nanoid()} track={track} />);
  return (
    <div className="homeContainer">
      <div className="leftHome">
        <h1 className="homeTitle">
          <img alt={data.user.display_name} src={data.user.profile_image} className="profilePic" />
          Good
          {' '}
          {greeting}
          ,
          {' '}
          {data.user.display_name}
        </h1>
        <h2 className="homeHeader">Your top artist</h2>
        <div className="sideScrollDiv">
          {artists.length !== 0 ? artists : <div className="empty">No Top Artists!</div>}
        </div>
        <h2 className="homeHeader">Your top tracks</h2>
        <div className="sideScrollDiv">
          {tracks.length !== 0 ? tracks : <div className="empty">No Top Tracks!</div>}
        </div>
        <h1 className="homeHeader">Suggestions from friends</h1>
        <div className="sideScrollDiv">
          {suggestions.length !== 0 ? suggestions : <div className="empty">No Suggestions!</div>}
        </div>
        <h2 className="homeHeader">Your playlists</h2>
        <div className="sideScrollDiv">
          {playlists.length !== 0 ? playlists : <div className="empty">No Playlists!</div>}
        </div>
        <h2 className="homeHeader">What friends are listening to</h2>
        <div className="sideScrollDiv">
          {listens.length !== 0 ? listens : <div className="empty">No Friends!</div>}
        </div>
      </div>
      <div className="rightHome">
        <div className="ratingContainer">
          <h2 className="homeHeader">
            Your Rating:
            {' '}
            {data.user.rating.toFixed(2)}
          </h2>
        </div>
        <div className="socialDiv">
          {socialItems.length !== 0 ? socialItems : <div className="emptySocials">No Socials</div>}
        </div>
        <div className="ratingContainer">
          <h2 className="homeHeader">Your Friends</h2>
        </div>
        <div className="friendsHomeContainer">
          {friendIcons.length === 0 ? <div className="emptySocials">No Friends</div> : friendIcons}
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
