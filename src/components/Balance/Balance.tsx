import { Loader } from 'decentraland-ui'
import React from 'react'
import { formatBalance } from '../../modules/utils'
import './Balance.css'
import { Props } from './Balance.types'

const Balance: React.FC<Props> = ({ balance, isUpdating }) => {
  return (
    <div className="Balance">
      {isUpdating ? (
        <Loader active size="mini" />
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
