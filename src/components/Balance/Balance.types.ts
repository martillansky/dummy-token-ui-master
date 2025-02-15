export type Props = {
  balance: string
  isUpdating: boolean
  error: string | null
}

export type MapStateProps = Pick<Props, 'balance' | 'isUpdating' | 'error'>
