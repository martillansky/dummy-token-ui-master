import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Transfer from './Transfer'
import { Props } from './Transfer.types'

describe('Transfer component', () => {
  const mockProps: Props = {
    address: '',
    addressFrom: '',
    amount: '',
    balance: '10000.0000',
    isConnected: true,
    isUpdating: false,
    error: null,
    onConnect: jest.fn(),
    onTransferConfirmed: jest.fn()
  }

  const renderTransfer = (props = mockProps) => {
    return render(
      <BrowserRouter>
        <Transfer {...props} />
      </BrowserRouter>
    )
  }

  it('should render connect button when not connected', () => {
    renderTransfer({ ...mockProps, isConnected: false })
    const connectButton = screen.getByText('Sign In')
    expect(connectButton).toBeInTheDocument()
  })

  it('should display transfer form when connected', () => {
    renderTransfer()
    expect(screen.getByPlaceholderText('100')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('0x')).toBeInTheDocument()
  })

  it('should call onTransferConfirmed with correct values', () => {
    renderTransfer()
    const amountInput = screen.getByPlaceholderText('100')
    const addressInput = screen.getByPlaceholderText('0x')
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.change(amountInput, { target: { value: '1.0000' } })
    fireEvent.change(addressInput, { target: { value: '0x123' } })
    fireEvent.click(submitButton)

    expect(mockProps.onTransferConfirmed).toHaveBeenCalledWith('', '0x123', '1.0000')
  })

  it('should display error message when present', () => {
    const error = 'Transfer failed'
    renderTransfer({ ...mockProps, error })
    expect(screen.getByText(error)).toBeInTheDocument()
  })

  it('should show loading state while updating', () => {
    renderTransfer({ ...mockProps, isUpdating: true })
    const submitButton = screen.getByRole('button', { name: /send/i })
    fireEvent.click(submitButton)
    expect(submitButton).toHaveClass('loading')
  })
})
