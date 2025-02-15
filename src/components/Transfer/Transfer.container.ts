import { connect } from 'react-redux'
import { getAddress, getAmount, getError } from '../../modules/transfer/selectors'
import { RootState } from '../../modules/types'
import Transfer from './Transfer'
import { MapStateProps } from './Transfer.types'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  amount: getAmount(state),
  error: getError(state)
})

/* const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransferConfirmed: (address, amount) => dispatch(transferTokenRequest(address, amount))
}) */

//const mapDispatch = () => {}

export default connect(mapState, null)(Transfer)
//export default connect(mapState, mapDispatch)(Transfer)
