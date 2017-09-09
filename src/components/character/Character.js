import React, { Component } from 'react'
import axios from 'axios'


class Character extends Component {
  render() {
    if (Object.keys(this.props.stats).length > 0) {
      return (
        <div className="char">
          <div className="char-name">
            { this.props.stats.name }
          </div>
          { <Films films={this.props.films} />}
        </div>
      )
    } else {
      // go get the data
      return <div>hey</div>
    }
  }
}

const Films = (props) => {
  let count = 0
  return (
    <div className="film-list">
      { props.films.map(film => <Film key={++count} info={film} />)}
    </div>
  )
}

const Film = (props) => {
  let { info } = props
  return (
    <div className="film">
      <span>{ info.title } </span>
      <span>{ new Date(info.created).getFullYear() }</span>
    </div>
  )
}

export default Character
