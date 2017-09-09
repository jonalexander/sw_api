import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'
import '../styles/App.css';
import data from '../temp_data/characters.json'

import Header from './header/Header'
import Character from './character/Character'
import Error404 from './errors/Error404'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedChar: {},
      stats: {},
      films: [],
      cachedChars: {},
      characters: this.cleanData(data.characters)
    }
  }

  cleanData= (arr) => {
    let cleanObj = {}
    arr.forEach(obj => {
      cleanObj[`${obj.name.replace(/\s|-/g, '').toLowerCase()}`] = obj
    })
    return cleanObj
  }

  handleNavClick = (key) => {
    let selectedChar = this.state.characters[key]

    this.fetchChar(key, selectedChar)
      .then((response) => {
        let cachedChars = Object.assign({}, this.state.cachedChars, { [key]: response })
        let { stats, films } = response
        this.setState({ stats, films, selectedChar, cachedChars })
        this.props.history.push(`/${key}`)
      })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // prevent handleNavClick from re-rendering App twice
    return nextState.selectedChar === this.state.selectedChar
  }

  fetchChar(key, selectedChar) {
    return new Promise((resolve) => {
      // return character from cache if previous get req was made
      if (this.state.cachedChars[key]) {
        let { stats, films } = this.state.cachedChars[key]
        resolve({ stats, films })
      } else {
        // populate films & stats then resolve
        axios.get(selectedChar.url).then(response => {
          let stats = response.data
          let films = []
          let filmUrls = response.data.films

          filmUrls.forEach((filmUrl, idx) => {
            axios.get(filmUrl).then(_response => {
              films.push(_response.data)
              idx + 1 === filmUrls.length ? resolve({ stats, films }) : ''
            })
          })
        })
        .catch(errResponse => {
          console.log(errResponse)
        })
      }
    })
  }

  render() {
    return (
      <div id='app'>
        <Header
          className="flex-row"
          characters={this.state.characters}
          handleNavClick={this.handleNavClick}
        />
        <div id='content' className="flex-row">
          <Switch>
            <Route exact path='/' render={() => <div>base</div>} />
            <Route path='/:character' render={
              () => <Character stats={this.state.stats} films={this.state.films} history={this.props.history} />
            }/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
