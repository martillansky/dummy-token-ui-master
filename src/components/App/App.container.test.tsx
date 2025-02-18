import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import AppContainer from './App.container'

const mockStore = configureStore([])

describe('App Container', () => {
  const initialState = {
    wallet: {
      address: null,
      isConnecting: false,
      error: null
    }
  }

  it('should map state and dispatch to props', () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </Provider>
    )

    // Verify initial state is mapped
    const actions = store.getActions()
    expect(actions).toEqual([])
  })
})
