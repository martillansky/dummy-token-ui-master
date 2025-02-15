import { AnyAction, Dispatch } from 'redux'
import { TransferTokenRequestAction } from '../../modules/transfer/actions'
import {
  BalanceUpdateAction,
  ConnectWalletRequestAction,
  TransferModalCloseAction,
  TransferModalOpenAction
} from '../../modules/wallet/actions'
//import { MapDispatch as MapDispatchTransfer, Props as PropsTransfer } from '../Transfer/Transfer.types'

export type Props = {
  address: string
  balance: string
  isConnected: boolean
  isConnecting: boolean
  isUpdating: boolean
  isTransferModelOpen: boolean
  error: string | null
  onConnect: () => void
  onTransfer: () => void
  onCloseModal: () => void
  onTransferConfirmed: (address: string, to: string, amount: string) => void
  /* onBalance: (amount: string) => void
  onBalanceRequest: (addres: string) => void */
} // & Pick<PropsTransfer, 'onTransferConfirmed'>

export type MapStateProps = Pick<
  Props,
  'address' | 'balance' | 'isConnected' | 'isConnecting' | 'isUpdating' | 'isTransferModelOpen' | 'error'
>
export type MapDispatchProps = Pick<
  Props,
  'onConnect' | 'onTransfer' | 'onCloseModal' | 'onTransferConfirmed' /* | 'onBalance' | 'onBalanceRequest' */
> /* &
  Pick<PropsTransfer, 'onTransferConfirmed'> */
export type MapDispatch = Dispatch<
  | ConnectWalletRequestAction
  | BalanceUpdateAction
  | TransferModalOpenAction
  | TransferModalCloseAction
  | TransferTokenRequestAction
  | AnyAction
> /* &
  MapDispatchTransfer */
