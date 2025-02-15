import { Button, Card, Center, Footer, Header, Navbar, Page } from 'decentraland-ui'
import React from 'react'
import { Balance } from '../Balance'
import Transfer from '../Transfer/Transfer'
import './App.css'
import { Props } from './App.types'

const App: React.FC<Props> = ({
  address,
  balance,
  isConnected,
  onConnect,
  onTransfer,
  onCloseModal,
  isConnecting,
  isTransferModelOpen,
  error,
  onTransferConfirmed,
  isUpdating
}) => {
  return (
    <>
      <Navbar activePage="Wallet" />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : !isTransferModelOpen ? (
            <Card>
              <Header>Wallet</Header>
              <p>
                <strong>Address:</strong>&nbsp;
                {address.slice(0, 6) + '...' + address.slice(-4)}
              </p>
              <p>
                <strong>Balance:</strong>&nbsp;
                {/* {balance + ' DUMMY'} */}
                <Balance balance={balance} error={error} isUpdating={isUpdating} />
                <Button basic onClick={onTransfer}>
                  TRANSFER
                </Button>
              </p>
            </Card>
          ) : (
            <Transfer
              error={null}
              balance={balance}
              onClose={onCloseModal}
              onTransferModal={(to, amount) => {
                onTransferConfirmed(address, to, amount)
              }}
            />
          )}
        </Center>
      </Page>
      <Footer />
    </>
  )
}

export default App
