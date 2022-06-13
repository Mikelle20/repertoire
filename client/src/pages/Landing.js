/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Landing () {
  const variants = {
    visibleX: {
      x: 0,
      transition: {
        when: 'beforeChildren',
        // staggerChildren: 3,
        type: 'spring',
        damping: 15
      }
    },

    visibleY: {
      y: 0,
      transition: {
        delay: 0.7,
        type: 'spring',
        damping: 15
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
    }
  }
  return (
    <motion.div className='landingContainer'
      initial={{ x: -10000 }}
      variants={variants}
      animate='visibleX'
    >
      <motion.div className='landingTop'
      >
      </motion.div>

      <motion.div className='landingBottom'
      >
      </motion.div>
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
          >
            <p>Sign In</p>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Landing
