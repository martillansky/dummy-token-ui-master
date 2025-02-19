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
      isConnected: false,
      error: null
    },
    balance: {
      balance: '10000.0000',
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
      wallet: {
        ...initialState.wallet,
        isConnected: true,
        address: '0x123'
      },
      transfer: {
        ...initialState.transfer,
        addressFrom: '0x123'
      }
    }

    // Render App
    const { unmount } = renderWithStore(<App />, connectedState)
    expect(screen.getByText('Wallet')).toBeInTheDocument()
    // Find the paragraph containing the address
    const addressParagraph = screen.getByText((_, element) => {
      return (element?.tagName.toLowerCase() === 'p' && element.textContent?.includes('0x123')) || false
    })
    expect(addressParagraph).toBeInTheDocument()
    unmount()

    // Render Transfer
    renderWithStore(<Transfer />, connectedState)
    // Look for the address in the input field
    const addressInput = screen.getByPlaceholderText('0x')
    expect(addressInput).toBeInTheDocument()
    expect(addressInput).toHaveValue('')
  })

  it('should validate transfer amount against balance', () => {
    renderWithStore(<Transfer />)

    // Simulate user input
    const amountInput = screen.getByPlaceholderText('100')
    const addressInput = screen.getByPlaceholderText('0x')

    // Enter an amount higher than balance
    fireEvent.change(amountInput, { target: { value: '20000.0000' } })
    fireEvent.change(addressInput, { target: { value: '0x456' } })

    // Check balance display using a regex pattern
    const formattedBalance = formatBalance('10000.0000')
    expect(
      screen.getByText(content => {
        return content.includes('Balance') && content.includes(formattedBalance)
      })
    ).toBeInTheDocument()

    // Check if button is disabled
    const sendButton = screen.getByRole('button', { name: /send/i })
    expect(sendButton).toBeDisabled()
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

    const sendButton = screen.getByRole('button', { name: /send/i })
    fireEvent.click(sendButton)

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
