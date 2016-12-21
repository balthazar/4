import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import { fetchBoard } from 'actions/main'
import { selectBoard } from 'actions/config'

@connect(
  ({ config: { selectedBoard } }) => ({ selectedBoard }), {
    selectBoard,
    fetchBoard,
  }
)
class BoardList extends Component {

  switchBoard = name => {
    const { selectBoard, fetchBoard, onChange } = this.props
    fetchBoard(name)
    selectBoard(name)
    onChange(name)
  }

  render () {
    const { boardNames, selectedBoard } = this.props

    return (
      <div className='board-links'>
        {boardNames.map(name => (
          <a
            onClick={() => this.switchBoard(name)}
            className={cx('board-link', { active: selectedBoard === name })}
            key={name}>
            <span>{name}</span>
          </a>
        ))}
      </div>
    )
  }

}

export default BoardList
