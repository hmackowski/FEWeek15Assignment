import React from 'react'
import spaceFriends from '../images/space-friends.jpg'

function NavBar() {
  return (
    <div className="nav-container">
      {/* Anchor tag containing an image (logo) which may act as a link to the homepage */}
      <img src={spaceFriends} alt="logo" className="Nav-logo"/>

      {/* Anchor tags for 'Home' and 'About' sections */}
      <a href="www.google.com">Home</a>
      <a href="www.youtube.com">About</a>
    </div>
  )
}

export default NavBar
