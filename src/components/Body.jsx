import React, {useEffect} from 'react'
import { useStateProvider } from '../util/StateProvider'
import axios from 'axios'
import { reducerCases } from '../util/constants'
import {AiFillClockCircle} from 'react-icons/ai'


export default function Body({headerBackground}) {

  const [{token, selectedPlaylistId, selectedPlaylist}, dispatch] = useStateProvider()
   
  useEffect(() => {
    async function getPlaylist () {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, 
      {
        headers:{
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      })
    
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a") ?
        '' : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track}) => ({
           id: track.id,
           name: track.name,
           artists: track.artists.map((artist) =>  artist.name),
           image: track.album.images[2].url,
           duration: track.duration_ms,
           album:track.album.name,
           context_uri: track.album.uri,
           track_number: track.track_number
        }))

      }
   
      dispatch({type:reducerCases.selected_playlist, selectedPlaylist})
    }
    getPlaylist()


  }, [token,dispatch, selectedPlaylistId])

  function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    return `${minutesString}:${secondsString}`;
  }

  async function playTrack(id,name,artists,image,context_uri,track_number) {
    const response = await axios.put("https://api.spotify.com/v1/me/player/play",
    {
      context_uri,
      offset: {
        position:track_number - 1
      },
      position_ms:0
    },
    {
      headers:{
        Authorization: "Bearer " + token,
        "Content-Type" : "application/json"
      }
    }
    )
    if(response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image

      }
      dispatch({type:reducerCases.set_playing, currentlyPlaying})
      dispatch({type:reducerCases.set_player_state, playerstate:true})
      
    }else {
      dispatch({type:reducerCases.set_player_state, playerstate:true})

    }
    
  }
  



  return (
    <div className='body-container'>
      {selectedPlaylist && (
        <>
        <div className="body-playlist">
          <div className="image">
            <img src={selectedPlaylist.image} alt="selectedPlaylist" />
          </div>
          <div className="details">
            <span className='type'>PLAYLIST</span>
            <h1 className='title'>{selectedPlaylist.name}</h1>
            <p className='description'>{selectedPlaylist.description}</p>
          </div>
        </div>
        <div className="list">
          <div className="header-row" style={{
            backgroundColor: headerBackground? "#000000dc" : "none"
          }}>
            <div className="col">
              <span>#</span>
            </div>
            <div className="col">
              <span>TITLE</span>
            </div>
            <div className="col">
              <span>ALBUM</span>
            </div>
            <div className="col">
              <span>
                <AiFillClockCircle />
              </span>
            </div>
          </div>
   
   <div className="tracks">
{
  selectedPlaylist.tracks.map(({
    id,name,artists,image
    ,duration,album,context_uri,
    track_number},index) => {
      return(
        <div className="track-row" key={id} onClick={() => playTrack(id,name,artists,image,context_uri,track_number)}>
          <div className="col">
            <span>{index + 1}</span>
          </div>
          <div className="col detail">
            <div className="image">
              <img src={image} alt='track' />
            </div>
            <div className="info">
              <span className='name'>{name}</span>
              <span>{artists}</span>
            </div> 
          </div>
            <div className="col">
              <span>{album}</span>
            </div>
            <div className="col">
              <span>{msToTime(duration)}</span>
            </div>
        </div>
      )
    })
}
   </div>
        </div>
        </>
      )}
    </div>
  )
}
