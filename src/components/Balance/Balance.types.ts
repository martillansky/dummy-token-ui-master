import { AnyAction, Dispatch } from 'redux'
import { BalanceUpdateAction } from '../../modules/balance/actions'

export type Props = {
  balance: string | null
  isUpdating: boolean
  error: string | null
  onBalanceUpdate: (balance: string) => void
}

export type MapStateProps = Pick<Props, 'balance' | 'isUpdating' | 'error'>
export type MapDispatchProps = Pick<Props, 'onBalanceUpdate'>
export type MapDispatch = Dispatch<BalanceUpdateAction | AnyAction>
