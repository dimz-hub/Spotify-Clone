import React, {useEffect} from 'react';
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle,
} from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi'
import { useStateProvider } from '../util/StateProvider';
import axios from 'axios';
import { reducerCases } from '../util/constants';




export default function PlayerControls() {

    const [{token,playerstate}, dispatch] = useStateProvider()


async function changeSong(type) {
   await axios.post(
     `https://api.spotify.com/v1/me/player/${type}`, {},
      {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }
    })
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
} else {
   dispatch({type: reducerCases.set_playing, currentlyPlaying:null})
}
}

async function changeState() {
   const state = playerstate? 'pause': "play"
   const response = await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,{},
      {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }
    })
    dispatch({type: reducerCases.set_player_state, playerstate:!playerstate})
}


   
  return (
    <div className='player-controls'>
     <div className="shuffle">
        <BsShuffle />
     </div>
     <div className="previous">
        <CgPlayTrackPrev onClick={() => changeSong('previous')}/>
     </div>
     <div className="state">
        {playerstate? <BsFillPauseCircleFill onClick={changeState} /> : <BsFillPlayCircleFill onClick={changeState} />}
     </div>
     <div className="next" onClick={() => changeSong('next')}>
        <CgPlayTrackNext />
     </div>
     <div className="repeat">
        <FiRepeat />
     </div>




    </div>
  )
}
