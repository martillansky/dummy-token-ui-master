import { AnyAction, Dispatch } from 'redux'
import { BalanceRequestUpdateAction } from '../../modules/balance/actions'

export type Props = {
  balance: string | null
  isUpdating: boolean
  onBalanceUpdate: (balance: string) => void
}

export type MapStateProps = Pick<Props, 'balance' | 'isUpdating'>
export type MapDispatchProps = Pick<Props, 'onBalanceUpdate'>
export type MapDispatch = Dispatch<BalanceRequestUpdateAction | AnyAction>
