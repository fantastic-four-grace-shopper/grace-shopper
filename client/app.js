import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
