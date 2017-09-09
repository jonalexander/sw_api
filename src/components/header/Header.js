import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  render() {
    const generateNavLinks = () => {
      let { characters, handleNavClick } = this.props
      let n1 = 0
      let n2 = 0

      return Object.keys(characters).map( characterKey => (
        <li key={n1++} >
          <a href=''
             key={n2++}
             onClick={(event) => {
               event.preventDefault();
               handleNavClick(characterKey)
             }}
            >{characters[characterKey].name}
          </a>
        </li>
      ))
    }
    return (
      <div id='header'>
        <li><NavLink to={'/'}><b>SWAPI</b></NavLink></li>
        { generateNavLinks() }
      </div>
    )
  }
}

export default Header;
