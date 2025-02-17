import { Loader } from 'decentraland-ui'
import React from 'react'
import { Props } from './Balance.types'

const Balance: React.FC<Props> = ({ balance, isUpdating, error }) => {
  return (
    <>
      {isUpdating ? <Loader active size="mini" /> : balance + ' DUMMY'}
      {error ? <p className="error">{error}</p> : null}
    </>
  )
}

export default Balance
