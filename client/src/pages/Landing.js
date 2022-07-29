/* eslint-disable import/no-absolute-path */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Landing () {
  const variants = {
    visibleY: {
      y: 0,
      transition: {
        delay: 0.7,
        type: 'spring',
        damping: 15
      }
    },
    fade1: {
      opacity: 0,
      transition: {
        repeat: Infinity,
        delay: 7,
        duration: 10,
        repeatDelay: 34,
        repeatType: 'reverse'
      }
    },
    fade2: {
      opacity: 0,
      transition: {
        repeat: Infinity,
        delay: 24,
        duration: 10,
        repeatDelay: 7,
        repeatType: 'reverse'
      } 
    },
    fade3: {
      opacity: 0,
      transition: {
        repeat: Infinity,
        delay: 41,
        duration: 10,
        repeatDelay: 7,
        repeatType: 'reverse'
      } 
    },
    fadeOut: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        delay: 7,
        duration: 10,
        repeatDelay: 7
      }
    },
    fadeIn: {
      opacity: 0,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        delay: 7,
        duration: 10,
        repeatDelay: 7
      }
    },
    fadeIn2: {
      opacity: 0,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        delay: 7,
        duration: 10,
        repeatDelay: 7
      }
    }
  }
  return (
    <motion.div className='landerContainer'
    >
      <div>
        <h1 className='landingTitle'><img className='logo' src={require('../assets/logos/listening-music.png')}></img>Repertoire</h1>
      </div>
      <motion.div className='contentContainer'
        initial={{ y: -1000 }}
        variants={variants}
        animate='visibleY'
      >
        <div className='landingAlbums'>
          <div className='landingAlbum1'>
            {/* <motion.img variants={variants} inital={{ opacity: 1 }} animate='fadeIn2' src={require('../assets/landingImgs/break_ur_heart.jpeg')} alt='break your heart' className='albumImg2'/> */}
            <motion.img variants={variants} inital={{ opacity: 0 }} animate='fadeOut' src={require('../assets/landingImgs/caprisongs.jpeg')} alt='fka twigs' className='albumImg'/>
            <motion.img variants={variants} inital={{ opacity: 1 }} animate='fadeIn' src={require('../assets/landingImgs/janet.jpeg')} className='albumImg2'></motion.img>
          </div>
          <div className='landingAlbum2'>
            <motion.img variants={variants} inital={{ opacity: 0 }} animate='fadeOut' src={require('../assets/landingImgs/phantasies.jpeg')} className='albumImg'></motion.img>
            <motion.img variants={variants} inital={{ opacity: 1 }} animate='fadeIn' src={require('../assets/landingImgs/dance_fever.jpeg')} className='albumImg2'></motion.img>
          </div>
          <div className='landingAlbum3'>
            <motion.img variants={variants} inital={{ opacity: 0 }} animate='fadeOut' src={require('../assets/landingImgs/small-things.jpeg')} className='albumImg'></motion.img>
            <motion.img variants={variants} inital={{ opacity: 1 }} animate='fadeIn' src={require('../assets/landingImgs/deacon.jpeg')} className='albumImg2'></motion.img>
          </div>
          <div className='landingAlbum4'>
            <motion.img variants={variants} inital={{ opacity: 0 }} animate='fadeOut' src={require('../assets/landingImgs/james_blake.jpeg')} className='albumImg'></motion.img>
            <motion.img variants={variants} inital={{ opacity: 1 }} animate='fadeIn' src={require('../assets/landingImgs/jubilee.jpeg')} className='albumImg2'></motion.img>
          </div>
        </div>

        <div className='landingBreaker'></div>

        <div className='breakerRight'>
          <h2 className='landingHeader'>Music Recommendation Made Easy.</h2>
          <h3 className='landingText'>Recommend, rate, and discuss the music you and your friends are currently listening to.</h3>
            <motion.button className='signIn'
              whileTap={{ scale: 0.9 }}
              onClick={() => { window.location.href = '/login' }}
            >
              <p>Sign In</p>
            </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Landing
