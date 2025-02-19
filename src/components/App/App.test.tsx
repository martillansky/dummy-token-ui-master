import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import App from './App'

const mockStore = configureStore([])

describe('App component', () => {
  const mockProps = {
    address: '',
    balance: '0',
    isConnecting: false,
    isConnected: false,
    error: '',
    onConnect: jest.fn()
  }

  const initialState = {
    wallet: {
      address: '',
      isConnecting: false,
      error: null
    },
    balance: {
      balance: '0',
      isUpdating: false
    },
    transfer: {
      addressFrom: '',
      address: '',
      amount: '',
      error: null,
      status: 'idle'
    }
  }

  const renderApp = (props = mockProps, state = initialState) => {
    const store = mockStore(state)
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <App {...props} />
        </BrowserRouter>
      </Provider>
    )
  }

  it('should render connect button when not connected', () => {
    renderApp()
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('should show loading state while connecting', () => {
    renderApp({ ...mockProps, isConnecting: true })
    expect(screen.getByRole('button', { name: 'Connect' })).toHaveClass('loading')
  })

  it('should display error message when present', () => {
    renderApp({ ...mockProps, error: 'Test error' })
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('should display wallet info when connected', () => {
    const connectedState = {
      ...initialState,
      wallet: {
        ...initialState.wallet,
        address: '0x123'
      }
    }
    renderApp({ ...mockProps, address: '0x123', isConnected: true }, connectedState)
    expect(screen.getByText('Wallet')).toBeInTheDocument()
    expect(screen.getByText(/0x123/)).toBeInTheDocument()
  })

  it('should call onConnect when connect button is clicked', () => {
    const onConnect = jest.fn()
    renderApp({ ...mockProps, onConnect })
    fireEvent.click(screen.getByText('Connect'))
    expect(onConnect).toHaveBeenCalled()
  })
})
