import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { formatBalance } from '../../modules/utils'
import { App } from '../App'
import { Transfer } from '../Transfer'
const mockStore = configureStore([])

describe('Component Integration', () => {
  const initialState = {
    wallet: {
      address: '0x123',
      isConnecting: false,
      error: null
    },
    balance: {
      balance: '10000', // 1.0000 with 4 decimals
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

    fireEvent.click(screen.getByText('TRANSFER'))
    expect(window.location.pathname).toBe('/transfer')
  })

  it('should show formatted balance in both App and Transfer components', () => {
    const formattedBalance = formatBalance(initialState.balance.balance)

    // Render App
    const { unmount } = renderWithStore(<App />)
    expect(screen.getByText(formattedBalance)).toBeInTheDocument()
    unmount()

    // Render Transfer
    renderWithStore(<Transfer />)
    expect(screen.getByText(`Balance: ${formattedBalance}`)).toBeInTheDocument()
  })

  it('should display MetaMask note in Transfer component', () => {
    renderWithStore(<Transfer />)
    expect(
      screen.getByText('Note: MetaMask might show 0 in the approval screen. The correct amount will be transferred.')
    ).toBeInTheDocument()
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

  it('should validate transfer amount against balance', () => {
    renderWithStore(<Transfer />)

    const amountInput = screen.getByPlaceholderText('100')
    fireEvent.change(amountInput, { target: { value: '2.0000' } }) // More than balance

    expect(screen.getByText(/Insufficient funds!/)).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeDisabled()
  })

  it('should handle transfer errors appropriately', () => {
    const transferErrorState: any = {
      ...initialState,
      transfer: { ...initialState.transfer, error: 'Transaction failed', status: 'error' }
    }
    renderWithStore(<Transfer />, transferErrorState)
    expect(screen.getByText('Transaction failed')).toBeInTheDocument()
  })

  it('should dispatch transfer action with correct values', () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Transfer />
        </BrowserRouter>
      </Provider>
    )

    const amountInput = screen.getByPlaceholderText('100')
    const addressInput = screen.getByPlaceholderText('0x')

    fireEvent.change(amountInput, { target: { value: '0.5000' } })
    fireEvent.change(addressInput, { target: { value: '0x456' } })
    fireEvent.click(screen.getByText('Send'))

    const actions = store.getActions()
    const transferAction = actions.find(action => action.type === '[Request] Transfer Token')
    expect(transferAction).toBeTruthy()
    expect(transferAction?.payload).toEqual({
      addressFrom: '0x123',
      address: '0x456',
      amount: '0.5000'
    })
  })
})
