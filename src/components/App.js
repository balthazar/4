import React, { Component } from 'react'
import styled from 'styled-components'

const div = styled.div || styled.default.div

const Style = div`
  .timer {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .board-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 18px;
    max-width: 800px;
    margin: 0 auto;
  }

  .board-link {
    &.active {
      color: #2aa198;
      text-decoration: none;
    }

    & + .board-link {
      margin-left: 0.3rem;
    }
  }

  .threads {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .thread-block {
    margin: 10px;
    width: 300px;
    height: 300px;

    background-color: #383838;
    position: relative;

    .back {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .content {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0.3rem;
      background: rgba(0, 0, 0, 0.7);
      height: 4rem;
      overflow-x: hidden;
      text-align: center;
      transition: height 250ms ease;
      cursor: pointer;

      user-select: none;

      .title {
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
    }

    .replies {
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      color: white;
      text-shadow: 0px 1px 5px #000;
    }

    &.watched {
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075), 0 0 20px rgba(38, 139, 210, 0.7);
    }

    &:hover {
      .content {
        height: 100%;
        align-items: center;
        flex-direction: column;
        display: flex;
      }
    }
  }

  .main-filter {
    height: 40px;
    width: calc(100% - 40px);
    margin: 20px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
  }
`

class App extends Component {
  render() {
    return <Style>{this.props.children}</Style>
  }
}

export default App
