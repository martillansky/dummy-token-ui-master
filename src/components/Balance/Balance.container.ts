import { connect } from 'react-redux'
import Balance from './Balance'

import { getBalance, /* getError, */ isUpdating } from '../../modules/balance/selectors'
import { RootState } from '../../modules/types'

import { balanceRequestUpdate } from '../../modules/balance/actions'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Balance.types'

const mapState = (state: RootState): MapStateProps => ({
  balance: getBalance(state),
  isUpdating: isUpdating(state)
  //error: getError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onBalanceUpdate: (balance: string) => dispatch(balanceRequestUpdate(balance))
})

export default connect(mapState, mapDispatch)(Balance)
