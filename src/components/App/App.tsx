import { Button, Card, Center, Footer, Header, Navbar, Page } from 'decentraland-ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Balance } from '../Balance'
import './App.css'
import { Props } from './App.types'

const App: React.FC<Props> = ({ address, isConnected, onConnect, isConnecting, error }) => {
  const navigate = useNavigate()
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
          ) : (
            <Card>
              <Header>Wallet</Header>
              <p>
                <strong>Address:</strong>&nbsp;
                {address!.slice(0, 6) + '...' + address!.slice(-4)}
              </p>
              <p>
                <strong>Balance:</strong>&nbsp;
                {/* {balance + ' DUMMY'} */}
                <Balance />
                <Button basic onClick={() => navigate('/transfer')}>
                  TRANSFER
                </Button>
              </p>
            </Card>
          )}
        </Center>
      </Page>
      <Footer />
    </>
  )
}

export default App
