import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './components/App'
import { store } from './modules/store'

import 'decentraland-ui/lib/styles.css'

ReactDOM.render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}>
      { */}
    <App />
    {/* }
    </ConnectedRouter> */}
  </Provider>,
  document.getElementById('root')
)
