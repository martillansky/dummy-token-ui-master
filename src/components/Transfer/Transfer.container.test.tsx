import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import TransferContainer from './Transfer.container'

const mockStore = configureStore([])

describe('Transfer Container', () => {
  const initialState = {
    wallet: {
      address: '0x123',
      isConnecting: false
    },
    transfer: {
      addressFrom: '',
      address: '',
      amount: '',
      error: null,
      status: 'idle'
    },
    balance: {
      balance: '10000',
      isUpdating: false
    }
  }

  it('should map state and dispatch to props', () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TransferContainer />
        </BrowserRouter>
      </Provider>
    )

    const actions = store.getActions()
    expect(actions).toEqual([])
  })
})
