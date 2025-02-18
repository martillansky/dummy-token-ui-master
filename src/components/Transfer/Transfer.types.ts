import { AnyAction, Dispatch } from 'redux'
import { TransferTokenRequestAction } from '../../modules/transfer/actions'

export type Props = {
  address: string | null
  amount: string | null
  addressFrom: string | null
  balance: string | null
  isConnected: boolean
  isUpdating: boolean
  error: string | null
  onTransferConfirmed: (addressFrom: string, address: string, amount: string) => void
  onConnect: () => void
}

export type MapStateProps = Pick<Props, 'address' | 'amount' | 'addressFrom' | 'balance' | 'isConnected' | 'isUpdating' | 'error'>
export type MapDispatchProps = Pick<Props, 'onTransferConfirmed' | 'onConnect'>
export type MapDispatch = Dispatch<TransferTokenRequestAction | AnyAction>
