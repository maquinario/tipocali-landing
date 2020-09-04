import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/style.scss'
import Router from '@/presentation/components/Router'
import { makeSubscribe } from './factories/pages/Subscribe'

ReactDOM.render(
  <Router makeSubscribe={makeSubscribe} />,
  document.getElementById('main')
)
