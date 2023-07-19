import React, {useEffect} from 'react'
import Login from './components/Login'
import { useStateProvider } from './util/StateProvider'
import { reducerCases } from './util/constants'
import Spotified from './components/Spotified'

export default function App() {

const [{token } , dispatch] = useStateProvider()

  useEffect ( () => {
    const hash = window.location.hash
    

    if(hash) {

      const token = hash.substring(1).split('&')[0].split("=")[1]
    
    dispatch({type:reducerCases.set_token, token})
  }

  },[token,dispatch ])

  
  return (
    <div>
      {token ? <Spotified /> : <Login />}
     
    </div>
  )
}
