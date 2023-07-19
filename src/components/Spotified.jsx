import React , {useEffect,useRef, useState } from 'react'
import Body from './Body'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useStateProvider } from '../util/StateProvider'
import axios from 'axios'
import { reducerCases } from '../util/constants'


export default function Spotified() {
  const [{token}, dispatch] = useStateProvider()
  useEffect(() =>{
    async function getUserData() {
      const response = await axios.get("https://api.spotify.com/v1/me",{
        headers:{
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      })

      const data = response.data

     const userInfo = {
        userId: data.id,
        username:data.display_name
      }
    
      dispatch({type: reducerCases.set_user, userInfo})

    }
    getUserData()
  },[dispatch, token])
  const bodyRef = useRef()
    const [navBackground, setNavBackground] = useState(false)
    const [headerBackground, setHeaderBackground] = useState(false)
 
    function bodyScrolled() {
      bodyRef.current.scrollTop >= 30 
      ?setNavBackground(true)
      :setNavBackground(false);
      
      bodyRef.current.scrollTop >= 268 
      ?setHeaderBackground(true)
      :setHeaderBackground(false)
    }
  // console.log(bodyRef.current.scrollTop)
    
  return (
    <div className= 'container'>
      <div className="spotify-body" ref={bodyRef} onScroll={bodyScrolled}>
        <Sidebar />
        <div className="body"  >
          <Navbar  navBackground = {navBackground}/>
          <div className="body-content">
<Body headerBackground = {headerBackground} />

          </div>
        </div>


      </div>

      <div className="spotify-footer">
        <Footer />
      </div>
      





    </div>
  )
}
