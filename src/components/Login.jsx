


export default function Login () {

  function handleClick() {
    const clientId = '58b3ff18a5f54cffa4af7ed69fe19517'
    const redirectUrl = "http://localhost:3000/"
    const apiUrl = 'https://accounts.spotify.com/authorize'
    const scope = [
      'user-read-private', 'user-read-email', 
      'user-library-read', 'playlist-read-private',
       'playlist-read-collaborative', 'playlist-modify-public' , 
       'playlist-modify-private', 'user-follow-modify' ,
       'user-follow-read', 'user-top-read', 'user-read-currently-playing'
    ]
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join( ' ' )}&response_type=token&show_dialog=true`
 
  }
  return (
    <div className='login'>
        <img src= '/images/spotifyblack.png' alt = 'spotify-icon' />
        <button onClick={handleClick}>Connect Spotify</button>
    </div>
  )
}
