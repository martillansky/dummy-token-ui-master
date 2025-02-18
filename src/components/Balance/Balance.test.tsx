import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Balance from './Balance'
import { Props } from './Balance.types'

describe('Balance component', () => {
  const mockProps: Props = {
    balance: '10000', // 1 DUMMY (4 decimals)
    isUpdating: false,
    onBalanceUpdate: jest.fn()
  }

  const renderBalance = (props = mockProps) => {
    return render(<Balance {...props} />)
  }

  it('should render formatted balance and symbol', () => {
    renderBalance()
    expect(screen.getByText('1.00')).toBeInTheDocument()
    expect(screen.getByText('DUMMY')).toBeInTheDocument()
  })

  it('should show loader when updating', () => {
    renderBalance({ ...mockProps, isUpdating: true })
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.queryByText('DUMMY')).not.toBeInTheDocument()
  })

  it('should format zero balance correctly', () => {
    renderBalance({ ...mockProps, balance: '0' })
    expect(screen.getByText('0.00')).toBeInTheDocument()
  })

  it('should format small balance correctly', () => {
    renderBalance({ ...mockProps, balance: '1000000000000000' }) // 0.001 DUMMY
    expect(screen.getByText('0.001')).toBeInTheDocument()
  })
})
