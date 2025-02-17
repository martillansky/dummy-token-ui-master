import { connect } from 'react-redux'
import { getBalance, isUpdating } from '../../modules/balance/selectors'
import { transferTokenRequest } from '../../modules/transfer/actions'
import { getAmount, getError } from '../../modules/transfer/selectors'
import { RootState } from '../../modules/types'
import { connectWalletRequest } from '../../modules/wallet/actions'
import { getAddress, isConnected } from '../../modules/wallet/selectors'
import Transfer from './Transfer'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Transfer.types'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  amount: getAmount(state),
  balance: getBalance(state),
  isConnected: isConnected(state),
  isUpdating: isUpdating(state),
  error: getError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransferConfirmed: (addressFrom, address, amount) => dispatch(transferTokenRequest(addressFrom, address, amount)),
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect(mapState, mapDispatch)(Transfer)
