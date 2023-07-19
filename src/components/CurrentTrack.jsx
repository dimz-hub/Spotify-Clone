import React, { useEffect } from 'react'
import { useStateProvider } from '../util/StateProvider'
import axios from 'axios'
import { reducerCases } from '../util/constants'

export default function CurrentTrack() {


    const [{token, currentlyPlaying}, dispatch] = useStateProvider()
    useEffect(() =>{
        async function getCurrentTrack() {
          const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            }
          })
    if (response.data !== '') {
      const { item } = response.data
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url
      }
      dispatch({type: reducerCases.set_playing, currentlyPlaying})
    }
        
         
    
        }
        getCurrentTrack()
      },[dispatch, token])

    





  return (
    <>
  {
  currentlyPlaying && (
    <div className='currently-playing'>
      <div className="track-image">
        <img src= {currentlyPlaying.image} alt='album cover' />
      </div>
      <div className="track-name">
        <h4>{currentlyPlaying.name}</h4>
        <h6>{currentlyPlaying.artists.join(', ')}</h6>
        
         </div>



    </div>
  )
      


  }
  </>
  )
}
