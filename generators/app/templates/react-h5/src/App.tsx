import React from 'react'
import { hot } from 'react-hot-loader'
import Errorboundary from '@components/error-boundary'
import routes from '@routes/config'
import Routes from '@routes'
import './App.less'

const App: React.FC = () => {
  return <Errorboundary>{Routes(routes)}</Errorboundary>
}

export default hot(module)(App)
