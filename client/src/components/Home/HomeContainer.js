/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React from 'react'
import SocialItem from './SocialItem'
import SideItem from './SideItem'
import SuggestionItem from './SuggestionItem'
import PlaylistItem from './PlaylistItem'
import { nanoid } from '@reduxjs/toolkit'
import RecentItem from './RecentItem'
import TrackItems from './TrackItems'

function HomeContainer (props) {
  const time = new Date()
  const hours = time.getHours()

  let greeting

  if (hours > 4 && hours < 12) greeting = 'Morning'
  if (hours >= 12 && hours < 18) greeting = 'Afternoon'
  if (hours <= 4 || hours >= 18) greeting = 'Evening'

  const artists = props.data.items.map((artist) => {
    return <SideItem
           artist={artist}
           key={artist.id}
           />
  })

  const suggestions = props.data.homeSuggestions.map(suggestion => {
    return <SuggestionItem key={nanoid()} suggestion={suggestion} />
  })

  const listens = props.data.friendListens.map(listen => {
    return <RecentItem key={nanoid()} listen={listen} />
  })

  const playlists = props.data.homePlaylists.map(playlist => {
    return <PlaylistItem key={nanoid()} playlist={playlist} />
  })

  const socials = props.socials.map(social => {
    return <SocialItem key={nanoid()} social={social} />
  })

  const tracks = props.data.tracks.map(track => {
    return <TrackItems key={nanoid()} track={track} />
  })
  return (
    <div className='homeContainer'>
    <div className='leftHome'>
      <h1 className='homeTitle'><img src={props.data.user.profile_image} className='profilePic'></img>Good {greeting}, {props.data.user.display_name}</h1>
      <h2 className='homeHeader'>Your top artist</h2>
      <div className='sideScrollDiv'>
        {artists.length !== 0 ? artists : <div className='empty'>No Top Artists!</div>}
      </div>
      <h2 className='homeHeader'>Your top tracks</h2>
      <div className='sideScrollDiv'>
        {tracks.length !== 0 ? tracks : <div className='empty'>No Top Tracks!</div>}
      </div>
      <h1 className='homeHeader'>Suggestions from friends</h1>
      <div className='sideScrollDiv'>
        {suggestions.length !== 0 ? suggestions : <div className='empty'>No Suggestions!</div>}
      </div>
      <h2 className='homeHeader'>Your Playlists</h2>
      <div className='sideScrollDiv'>
        {playlists.length !== 0 ? playlists : <div className='empty'>No Playlists!</div>}
      </div>
      <h2 className='homeHeader'>What friends are listening to</h2>
      <div className='sideScrollDiv'>
        {listens.length !== 0 ? listens : <div className='empty'>No Friends!</div>}
      </div>
    </div>
    <div className='rightHome'>
      <div className='ratingContainer'>
        <h2 className='homeHeader'>Your Rating: {props.data.user.rating.toFixed(2)}</h2>
      </div>
      <div className='socialDiv'>
        {socials.length !== 0 ? socials : <div className='emptySocials'>No Socials</div>}
      </div>
    </div>
  </div>
  )
}

export default HomeContainer
