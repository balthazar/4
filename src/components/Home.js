import React, { Component } from 'react'
import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { isString } from 'lodash'
import spinners from 'cli-spinners'

import BoardList from 'components/BoardList'
import ThreadList from 'components/ThreadList'

import { fetchBoards, fetchBoard, toggleWatch } from 'actions/main'
import { toggleRefresh } from 'actions/config'

@provideHooks({
  fetch: ({ dispatch, initialState }) => Promise.all([
    dispatch(fetchBoards()),
    dispatch(fetchBoard(initialState.config.selectedBoard)),
  ]),
})
@connect(({
  main: { boards, threads, watch },
  config: { selectedBoard, refresh },
}) => ({ boards, threads, watch, selectedBoard, refresh }), {
  fetchBoard,
  toggleRefresh,
  toggleWatch,
})
class Home extends Component {

  componentDidMount () {
    this.refresh()
    this.refreshTitle(true)
    window.addEventListener('keydown', this.handleKey)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKey)
  }

  refreshTitle = value => {
    clearInterval(this.intTitle)

    if (!value) {
      return document.title = '4 ☰'
    }

    let i = 0
    const { interval, frames } = spinners.hamburger

    this.intTitle = setInterval(() => {
      document.title = `4 ${frames[i]}`
      i = i === frames.length - 1 ? 0 : ++i
    }, interval)
  }

  handleKey = ({ key }) => {
    const { toggleRefresh, refresh } = this.props

    if (key === 'r') {
      const newRefresh = !refresh
      toggleRefresh(newRefresh)
      this.refreshTitle(newRefresh)
      this.refresh(newRefresh)
    }
  }

  refresh = name => {
    const { fetchBoard, selectedBoard } = this.props

    if (this.int) { clearInterval(this.int) }
    if (name === false) { return }

    this.int = setInterval(() => {
      fetchBoard(isString(name) ? name : selectedBoard)
    }, 7E3)
  }

  render () {

    const { boards, threads, watch, selectedBoard, toggleWatch } = this.props

    return (
      <div>

        <BoardList
          onChange={name => this.refresh(name)}
          boardNames={boards.map(({ board }) => board)}
        />

        <ThreadList
          onClick={toggleWatch}
          watch={watch}
          board={selectedBoard}
          threads={threads} />

      </div>
    )
  }

}

export default Home
