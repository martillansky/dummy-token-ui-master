import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import BalanceContainer from './Balance.container'

const mockStore = configureStore([])

describe('Balance Container', () => {
  const initialState = {
    balance: {
      balance: '10000',
      isUpdating: false
    }
  }

  it('should map state and dispatch to props', () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <BalanceContainer />
      </Provider>
    )

    const actions = store.getActions()
    expect(actions).toEqual([])
  })
})
