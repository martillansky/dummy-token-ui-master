import { Button, Close, Field, Header, Modal, ModalDescription } from 'decentraland-ui'
import React, { useState } from 'react'
import './Transfer.css'
import { Props } from './Transfer.types'

type PropsLocal = Omit<Props, 'address' | 'amount'>

const Transfer: React.FC<PropsLocal> = ({ onClose, onTransferModal, balance, error }) => {
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)
  const [insufficient, setIsInsufficient] = useState(false)

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value
    try {
      if (Number(newAmount) > Number(balance)) {
        setIsInsufficient(true)
      } else {
        setIsInsufficient(false)
      }
      setAmount(newAmount)
    } catch (error: any) {
      const typedError = error as Error
      console.error('Unexpected error. ' + typedError.message)
    }
  }

  const handleClick = () => {
    setIsTransferring(true)
    onTransferModal(address, amount)
  }

  return (
    <>
      <Modal size="small" open={true} closeIcon={<Close onClick={onClose} />}>
        <Header textAlign="center">Transfer Token</Header>
        <ModalDescription>Send tokens to an account</ModalDescription>
        <Modal.Content>
          <Field
            label="Amount"
            onChange={handleChangeAmount}
            placeholder="100"
            message={`Balance: ${balance}`.concat(insufficient ? '. Insufficient funds!' : '')}
            error={insufficient}
            type="number"
            onKeyDown={(e: any) => ['e', 'E', '-', '+', '.', ','].includes(e.key) && e.preventDefault()}
          />
          &nbsp;
          <Field label="Address" type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="0x" />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleClick} loading={isTransferring} disabled={insufficient}>
            Send
          </Button>
          {error ? <p className="error">{error}</p> : null}
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default Transfer
