import { connect } from 'react-redux'
import { balanceRequest } from '../../modules/balance/actions'
import { isUpdating } from '../../modules/balance/selectors'
import { transferTokenRequest } from '../../modules/transfer/actions'
import { RootState } from '../../modules/types'
import { balanceUpdate, connectWalletRequest, transferModalClose, transferModalOpen } from '../../modules/wallet/actions'
import { getAddress, getBalance, getError, isConnected, isConnecting, isTransferModelOpen } from '../../modules/wallet/selectors'
import App from './App'
import { MapDispatch, MapDispatchProps, MapStateProps } from './App.types'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  balance: getBalance(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  isUpdating: isUpdating(state),
  isTransferModelOpen: isTransferModelOpen(state),
  error: getError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onTransfer: () => dispatch(transferModalOpen()),
  onCloseModal: () => dispatch(transferModalClose()),
  onTransferConfirmed: (address: string, to: string, amount: string) => dispatch(transferTokenRequest(address, to, amount))
  /* onBalance: (amount: string) => dispatch(balanceUpdate(amount)),
  onBalanceRequest: (address: string) => dispatch(balanceRequest(address)) */
})

export default connect(mapState, mapDispatch)(App)
