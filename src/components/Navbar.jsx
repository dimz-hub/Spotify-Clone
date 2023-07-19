import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import { useStateProvider } from '../util/StateProvider';


export default function Navbar({navBackground}) {
  const [{userInfo}] = useStateProvider()
  // console.log(navBackground)
 
  return (
    <div className='navbar' style={{
      backgroundColor: navBackground? "rgba(0,0,0,0.7)": "none"
      
      }}>
      <div className="search-bar">
        <FaSearch />
        <input placeholder='Artists, song or podcast'/>
      </div>
      <div className="avatar">
        <a href=''>
        <CgProfile />
        <span>{userInfo?.username} </span>

        </a>
      </div>
    </div>
  )
}
