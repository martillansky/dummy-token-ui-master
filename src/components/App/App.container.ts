import { connect } from 'react-redux'
import { RootState } from '../../modules/types'
import { connectWalletRequest } from '../../modules/wallet/actions'
import { getAddress, getError, isConnected, isConnecting } from '../../modules/wallet/selectors'
import App from './App'
import { MapDispatch, MapDispatchProps, MapStateProps } from './App.types'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  error: getError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect(mapState, mapDispatch)(App)
