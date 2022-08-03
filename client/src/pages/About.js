import { Tooltip } from '@mui/material'
import React from 'react'

function About () {
  return (
    <div className='landingContainer'>
        <div className='pageContainer'>
            <div className='infoContainer'>
                <div className='aboutContainer'>
                    <h1 className='aboutHeader'>About</h1>
                    <p className='aboutParagraph'>Founded in 2022, Repertoire is an independent created social media web application oriented around music, letting users recommend and rate music to and from their friends. Striving to create a community for music fans that are seeking to build their repertoires. Repertoire was created by <Tooltip title={<div className='toolTip'><div>Email: mikellewade@gmail.com</div><div>My Spotify: <a className='link' href='https://open.spotify.com/user/mikellewade?si=c6dc1f6dd2f64a73'>elle 🍄🍒</a></div></div>}><span id='myname'>Mikelle</span></Tooltip> (they/them), a black and queer web developer. </p>
                </div>

                <div className='faqContainer'>
                    <h1 className='aboutHeader'>FAQs</h1>
                    <h2 className='faqSubHead'>Do I need a Spotify account?</h2>
                    <p className='paragraph'>Yes. As of right now, the only music platform that Repertoire works with is Spotify premium accounts. I am working towards integrating Apple Music, Tidal, Amazon, and other music streaming platforms in the near future.</p>

                    <h2 className='faqSubHead'>Can I still add songs to my Repertoire playlists?</h2>
                    <p className='paragraph'>Yes, you can. However, they will not show up on Repertoire. This is because Repertoire only tracks items added to the playlists through the website by other users.</p>

                    <h2 className='faqSubHead'>My username search isn&apos;t showing results, why?</h2>
                    <p className='paragraph'>Spotify usernames are case sensitive. Please make sure you are entering them correctly.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
