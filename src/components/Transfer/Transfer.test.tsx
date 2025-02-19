import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Transfer from './Transfer'
import { Props } from './Transfer.types'

describe('Transfer component', () => {
  const mockProps: Props = {
    address: '0x123',
    addressFrom: '',
    amount: '',
    balance: '1000',
    isConnected: true,
    isUpdating: false,
    error: null,
    onTransferConfirmed: jest.fn(),
    onConnect: jest.fn()
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
    const connectButton = screen.getByText('Connect')
    expect(connectButton).toBeInTheDocument()
  })

  it('should display transfer form when connected', () => {
    renderTransfer()
    expect(screen.getByText('Transfer')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument()
  })

  it('should call onTransferConfirmed with correct values', () => {
    renderTransfer()
    const amountInput = screen.getByPlaceholderText('Amount')
    const addressInput = screen.getByPlaceholderText('Address')
    const submitButton = screen.getByText('Send')

    fireEvent.change(amountInput, { target: { value: '100' } })
    fireEvent.change(addressInput, { target: { value: '0x456' } })
    fireEvent.click(submitButton)

    expect(mockProps.onTransferConfirmed).toHaveBeenCalledWith('0x123', '0x456', '100')
  })

  it('should display error message when present', () => {
    const error = 'Transfer failed'
    renderTransfer({ ...mockProps, error })
    expect(screen.getByText(error)).toBeInTheDocument()
  })

  it('should show loading state while updating', () => {
    renderTransfer({ ...mockProps, isUpdating: true })
    const submitButton = screen.getByText('Send')
    expect(submitButton).toHaveAttribute('aria-busy', 'true')
  })
})
