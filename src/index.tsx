import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { App } from './components/App'
import { Transfer } from './components/Transfer'
import { store } from './modules/store'

import 'decentraland-ui/lib/styles.css'

ReactDOM.render(
  <Provider store={store}>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
)
