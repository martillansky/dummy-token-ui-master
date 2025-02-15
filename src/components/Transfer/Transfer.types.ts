import { AnyAction, Dispatch } from 'redux'
import { TransferTokenRequestAction } from '../../modules/transfer/actions'

export type Props = {
  address: string | null
  amount: string | null
  balance: string | null
  onClose: () => void
  onTransferModal: (address: string, amount: string) => void
  error: string | null
}

export type MapStateProps = Pick<Props, 'address' | 'amount' | 'error'>
//export type MapDispatchProps = Pick<Props, 'onTransferConfirmed'>
//export type MapDispatch = Dispatch<TransferTokenRequestAction | AnyAction>
