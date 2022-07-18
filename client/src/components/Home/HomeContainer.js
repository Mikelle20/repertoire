/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import SocialItem from './SocialItem'
import { useSelector } from 'react-redux'
import SideItem from './SideItem'
import SuggestionItem from './SuggestionItem'
import PlaylistItem from './PlaylistItem'
import { nanoid } from '@reduxjs/toolkit'

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
    return <SuggestionItem key={suggestion.songId} suggestion={suggestion} />
  })

  const playlists = props.data.homePlaylists.map(playlist => {
    return <PlaylistItem key={nanoid(10)} playlist={playlist} />
  })

  const socials = props.socials.map(social => {
    return <SocialItem key={nanoid(10)} social={social} />
  })
  return (
    <div className='homeContainer'>
    <div className='leftHome'>
      <h1 className='homeTitle'><img src={props.data.user.profile_image} className='profilePic'></img>Good {greeting}, {props.data.user.display_name}</h1>
      <h2 className='homeHeader'>Your top artist</h2>
      <div className='sideScrollDiv'>
        {artists}
      </div>
      <h1 className='homeHeader'>Suggestions from friends</h1>
      <div className='sideScrollDiv'>
        {suggestions.length !== 0 ? suggestions : <div className='empty'>No Suggestions!</div>}
      </div>
      <h2 className='homeHeader'>Your Playlists</h2>
      <div className='sideScrollDiv'>
        {playlists.length !== 0 ? playlists : <div className='empty'>No Playlists!</div>}
      </div>
    </div>
    <div className='rightHome'>
      <div className='ratingContainer'>
        <h2 className='homeHeader'>Rating: {props.data.user.rating}</h2>
      </div>
      <div className='socialDiv'>
        {socials.length !== 0 ? socials : <div className='emptySocials'>No Socials</div>}
      </div>
    </div>
  </div>
  )
}

export default HomeContainer
