import React from 'react'
import { useStateProvider } from '../util/StateProvider'
import axios from 'axios'
import { useEffect } from 'react'
import { reducerCases } from '../util/constants'




export default function Playlist() {

const [{token, playlists} ,dispatch ] = useStateProvider()

useEffect(() => {
   const getPlaylistData = async () => {
    const response = await axios.get( "https://api.spotify.com/v1/me/playlists",
      {
   
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }  
     
    )
    const {items} = response.data
    const playlists = items.map(({name, id} ) => {
      return {name,id}
    })
 dispatch({type:reducerCases.set_playlist, playlists})
   }
   getPlaylistData()

}, [token , dispatch])

function changeCurrentPlaylist(selectedPlaylistId) {
  dispatch({type:reducerCases.set_playlist_id, selectedPlaylistId})
}



  return (
    <div className='playlist-container' >
      <ul className='playlists'>
        {playlists.map(({name,id}) => {
          return <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name}</li>
        }) }

      </ul>
      
    </div>
  )
}
