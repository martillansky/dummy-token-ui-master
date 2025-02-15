import { connect } from 'react-redux'
import Balance from './Balance'

import { getError, isUpdating } from '../../modules/balance/selectors'
import { RootState } from '../../modules/types'

import { getBalance } from '../../modules/wallet/selectors'
import { MapStateProps } from './Balance.types'

const mapState = (state: RootState): MapStateProps => ({
  balance: getBalance(state),
  isUpdating: isUpdating(state),
  error: getError(state)
})

export default connect(mapState, null)(Balance)
