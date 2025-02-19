import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { App } from '../App'
import { Transfer } from '../Transfer'

const mockStore = configureStore([])

describe('Component Integration', () => {
  const initialState: {
    wallet: {
      address: string
      isConnecting: boolean
      error: string | null
    }
    balance: {
      balance: string
      isUpdating: boolean
    }
    transfer: {
      addressFrom: string
      address: string
      amount: string
      error: string | null
      status: string
    }
  } = {
    wallet: {
      address: '0x123',
      isConnecting: false,
      error: null
    },
    balance: {
      balance: '10000',
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

  const renderWithStore = (component: React.ReactNode, state = initialState) => {
    const store = mockStore(state)
    return render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    )
  }

  it('should navigate from App to Transfer when clicking transfer button', () => {
    const store = mockStore({
      ...initialState,
      wallet: { ...initialState.wallet, isConnected: true }
    })

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )

    const transferButton = screen.getByText('TRANSFER')
    fireEvent.click(transferButton)

    // Verify navigation occurred
    expect(window.location.pathname).toBe('/transfer')
  })

  it('should show balance in both App and Transfer components', () => {
    // Render App
    const { unmount } = renderWithStore(<App />)
    expect(screen.getByText('1.00')).toBeInTheDocument()
    unmount()

    // Render Transfer
    renderWithStore(<Transfer />)
    expect(screen.getByText('1.00')).toBeInTheDocument()
  })

  it('should maintain wallet connection state across components', () => {
    const connectedState = {
      ...initialState,
      wallet: { ...initialState.wallet, isConnected: true }
    }

    // Render App
    const { unmount } = renderWithStore(<App />, connectedState)
    expect(screen.getByText('0x123...123')).toBeInTheDocument()
    unmount()

    // Render Transfer
    renderWithStore(<Transfer />, connectedState)
    expect(screen.getByText('From: 0x123...123')).toBeInTheDocument()
  })

  it('should update balance across components when transfer occurs', () => {
    const store = mockStore(initialState)

    renderWithStore(<Transfer />)

    // Perform transfer
    const amountInput = screen.getByPlaceholderText('Amount')
    const addressInput = screen.getByPlaceholderText('Address')
    fireEvent.change(amountInput, { target: { value: '100' } })
    fireEvent.change(addressInput, { target: { value: '0x456' } })
    fireEvent.click(screen.getByText('Send'))

    // Verify balance update action was dispatched
    const actions = store.getActions()
    expect(actions.some(action => action.type.includes('BALANCE_UPDATE'))).toBeTruthy()
  })

  it('should display wallet connection errors', () => {
    const errorState = {
      ...initialState,
      wallet: { ...initialState.wallet, error: 'Failed to connect wallet' }
    }
    renderWithStore(<App />, errorState)
    expect(screen.getByText('Failed to connect wallet')).toBeInTheDocument()
  })

  it('should handle transfer errors', () => {
    const transferErrorState = {
      ...initialState,
      transfer: { ...initialState.transfer, error: 'Insufficient funds', status: 'error' }
    }
    renderWithStore(<Transfer />, transferErrorState)
    expect(screen.getByText('Insufficient funds')).toBeInTheDocument()
  })

  it('should validate transfer inputs', () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Transfer />
        </BrowserRouter>
      </Provider>
    )

    const amountInput = screen.getByPlaceholderText('Amount')
    const addressInput = screen.getByPlaceholderText('Address')
    const submitButton = screen.getByText('Send')

    // Submit without inputs
    fireEvent.click(submitButton)
    const actions = store.getActions()
    expect(actions.length).toBe(0) // Form should prevent submission

    // Fill invalid values
    fireEvent.change(amountInput, { target: { value: '100' } })
    fireEvent.change(addressInput, { target: { value: '0x456' } })
    fireEvent.click(submitButton)

    // Verify transfer action was dispatched
    expect(actions.some(action => action.type.includes('TRANSFER_TOKEN_REQUEST'))).toBeTruthy()
  })
})
