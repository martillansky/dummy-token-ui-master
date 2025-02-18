import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Props } from './App.types'

describe('App component', () => {
  const mockProps: Props = {
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    onConnect: jest.fn()
  }

  const renderApp = (props = mockProps) => {
    return render(
      <BrowserRouter>
        <App {...props} />
      </BrowserRouter>
    )
  }

  it('should render connect button when not connected', () => {
    renderApp()
    const connectButton = screen.getByText('Connect')
    expect(connectButton).toBeInTheDocument()
  })

  it('should show loading state while connecting', () => {
    renderApp({ ...mockProps, isConnecting: true })
    const connectButton = screen.getByText('Connect')
    expect(connectButton).toHaveAttribute('aria-busy', 'true')
  })

  it('should display error message when present', () => {
    const error = 'Connection failed'
    renderApp({ ...mockProps, error })
    expect(screen.getByText(error)).toBeInTheDocument()
  })

  it('should display wallet info when connected', () => {
    const address = '0x123456789abcdef'
    renderApp({
      ...mockProps,
      address,
      isConnected: true
    })

    expect(screen.getByText('Wallet')).toBeInTheDocument()
    expect(screen.getByText('0x1234...cdef')).toBeInTheDocument()
    expect(screen.getByText('TRANSFER')).toBeInTheDocument()
  })

  it('should call onConnect when connect button is clicked', () => {
    renderApp()
    const connectButton = screen.getByText('Connect')
    fireEvent.click(connectButton)
    expect(mockProps.onConnect).toHaveBeenCalled()
  })
})
