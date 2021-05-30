import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import { initFontSize, solveBlockForm } from '@utils/tool'
import App from './App'

initFontSize()
solveBlockForm()

ReactDOM.render(<App />, document.getElementById('root'))
