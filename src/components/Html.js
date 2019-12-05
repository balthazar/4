import React from 'react'

const globalStyle = `
  *,
  *:after,
  *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
    background: transparent;
    border: none;
    outline: none;
  }

  ::selection {
    background: #268bd2;
  }

  html {
    font-family: monospace;
    background-color: #1d1f21;
    color: #c5c8c6;
    padding: 0.5rem;
  }

  #root {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  a {
    color: #268bd2;
    cursor: pointer;
    &:hover {
      text-decoration: overline;
    }
  }
`

const Html = ({ content, state, stats: { main = 'bundle.js' } }) => (
  <html>
    <head>
      <title>{'4 ☰'}</title>

      <meta charSet="utf-8" />
      <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />

      <style>{globalStyle}</style>

      <script
        dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}` }}
      />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script src={`/dist/${main}`} />
    </body>
  </html>
)

export default Html
