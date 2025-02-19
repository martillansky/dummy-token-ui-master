import { Button, Close, Field, Footer, Header, Modal, ModalDescription, Navbar, Page } from 'decentraland-ui'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatBalance } from '../../modules/utils'
import './Transfer.css'
import { Props } from './Transfer.types'

const Transfer: React.FC<Props> = ({ error, address, balance, isConnected, isUpdating, onTransferConfirmed, onConnect }) => {
  const navigate = useNavigate()

  const [amount, setAmount] = useState('')
  const [addressTo, setAddressTo] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)
  const [insufficient, setIsInsufficient] = useState(false)

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value
    try {
      const amountFloat = parseFloat(newAmount || '0')
      const balanceFloat = parseFloat(formatBalance(balance))
      setIsInsufficient(amountFloat > balanceFloat)
      setAmount(newAmount)
    } catch (error: any) {
      const typedError = error as Error
      console.error('Unexpected error. ' + typedError.message)
    }
  }

  const handleClick = () => {
    setIsTransferring(true)
    onTransferConfirmed(address!, addressTo, amount)
  }

  const handleClose = () => {
    navigate('/')
  }

  useEffect(() => {
    !isConnected && onConnect()
  }, [])

  useEffect(() => {
    isTransferring && !isUpdating && handleClose()
  }, [isUpdating])

  useEffect(() => {
    setIsTransferring(false)
  }, [error])

  return (
    <>
      <Navbar activePage="Transfer" />
      <Page className="Transfer">
        <Modal size="small" open={true} closeIcon={<Close onClick={handleClose} />}>
          <Header textAlign="center">Transfer Token</Header>
          <ModalDescription>Send tokens to an account</ModalDescription>
          <Modal.Content>
            <Field
              label="Amount"
              onChange={handleChangeAmount}
              placeholder="100"
              message={`Balance: ${formatBalance(balance)}`.concat(insufficient ? '. Insufficient funds!' : '')}
              error={insufficient}
              type="number"
              onKeyDown={(e: any) => ['e', 'E', '-', '+', ','].includes(e.key) && e.preventDefault()}
            />
            <small className="transfer-note">
              Note: MetaMask might show 0 in the approval screen. The correct amount will be transferred.
            </small>
            &nbsp;
            <Field label="Address" type="address" value={addressTo} onChange={e => setAddressTo(e.target.value)} placeholder="0x" />
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={handleClick} loading={isTransferring} disabled={insufficient}>
              Send
            </Button>
            {error ? <p className="error">{error}</p> : null}
          </Modal.Actions>
        </Modal>
      </Page>
      <Footer />
    </>
  )
}

export default Transfer
