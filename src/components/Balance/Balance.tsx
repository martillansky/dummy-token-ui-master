import React from 'react'
import { formatBalance } from '../../modules/utils'
import './Balance.css'
import { Props } from './Balance.types'

const Balance: React.FC<Props> = ({ balance, isUpdating }) => {
  return (
    <div className="Balance">
      {isUpdating ? (
        <div className="ui mini active loader" data-testid="balance-loader" />
      ) : (
        <>
          <span className="amount">{formatBalance(balance)}</span>
          <span className="symbol">DUMMY</span>
        </>
      )}
    </div>
  )
}

export default Balance
