import React from 'react'
import { useStateProvider } from '../util/StateProvider'
import axios from 'axios'

export default function Volume() {
    const [{token}] = useStateProvider()
    async function setVolume(e) {
        await axios.put(
            "https://api.spotify.com/v1/me/player/volume",
            {},
            {
                params:{
                  volume_percent: parseInt(e.target.value)
                },
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            }
          })

    }
    console.log()
  return (
    <div className='volume'>
<input type='range' min={0} max={100} onMouseUp={(e =>setVolume(e))} />

    </div>
  )
}
