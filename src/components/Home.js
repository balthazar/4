import React, { Component } from 'react'
import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { isString } from 'lodash'
import spinners from 'cli-spinners'

import BoardList from 'components/BoardList'
import ThreadList from 'components/ThreadList'

import { fetchBoards, fetchBoard, toggleWatch, changeFilter } from 'actions/main'
import { toggleRefresh } from 'actions/config'

@provideHooks({
  fetch: ({ dispatch, initialState }) =>
    Promise.all([dispatch(fetchBoards()), dispatch(fetchBoard(initialState.config.selectedBoard))]),
})
@connect(
  ({ main: { boards, threads, watch, filter }, config: { selectedBoard, refresh } }) => ({
    boards,
    threads: threads.filter(
      t =>
        (t.com && t.com.toLowerCase().includes(filter)) ||
        (t.sub && t.sub.toLowerCase().includes(filter)),
    ),
    watch,
    filter,
    selectedBoard,
    refresh,
  }),
  {
    fetchBoard,
    toggleRefresh,
    toggleWatch,
    changeFilter,
  },
)
class Home extends Component {
  state = {
    isFocused: false,
    timer: 6,
  }

  componentDidMount() {
    this.refresh()
    this.refreshTitle(true)
    window.addEventListener('keydown', this.handleKey)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey)
  }

  launchClock = () => {
    if (this.clock) {
      clearInterval(this.clock)
    }

    this.setState({ timer: 6 })

    this.clock = setInterval(() => {
      this.setState({ timer: this.state.timer <= 0 ? 6 : this.state.timer - 1 })
    }, 1e3)
  }

  refreshTitle = value => {
    clearInterval(this.intTitle)

    if (!value) {
      return (document.title = '4 ☰')
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
    const { isFocused } = this.state

    if (key === 'r' && !isFocused) {
      const newRefresh = !refresh

      toggleRefresh(newRefresh)
      this.refreshTitle(newRefresh)
      this.refresh(newRefresh)
    }
  }

  refresh = name => {
    const { fetchBoard, selectedBoard } = this.props

    if (this.int) {
      clearInterval(this.int)
    }

    if (name === false) {
      return
    }

    this.launchClock()

    this.int = setInterval(() => {
      fetchBoard(isString(name) ? name : selectedBoard)
    }, 7e3)
  }

  render() {
    const {
      boards,
      threads,
      refresh,
      watch,
      filter,
      selectedBoard,
      toggleWatch,
      changeFilter,
    } = this.props
    const { timer } = this.state

    return (
      <div>
        <BoardList
          onChange={name => this.refresh(name)}
          boardNames={boards.map(({ board }) => board)}
        />

        {refresh && timer > -1 && <span className="timer">{timer}</span>}

        <input
          className="main-filter"
          placeholder="Filter threads"
          type="text"
          value={filter}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          onChange={e => changeFilter(e.target.value)}
        />

        <ThreadList
          onClick={toggleWatch}
          watch={watch}
          board={selectedBoard}
          filter={filter}
          threads={threads}
        />
      </div>
    )
  }
}

export default Home
