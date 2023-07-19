import React from 'react'
import {FaHome} from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi';
import { IoLibrary } from 'react-icons/io5';
import Playlist from './Playlist';





export default function Sidebar() {
  return (
    <div className='side-bar'>
      <div className="logo">
        <img src='/images/spotify-white.png' alt='spotify-icon' />
      </div>
      <div className="sidebar-links">

        <ul>


        <li>
          <FaHome />
          <span>Home</span>
          </li>
        <li>
          <BiSearch />
          <span>Search</span>
          </li>
        <li>
     
        <IoLibrary />

          <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlist />
    </div>
  )
}
