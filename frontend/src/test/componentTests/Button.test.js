import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Button from '../../components/essentials/Button';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

describe('Button Component', () => {
  it('renders button and text given correctly', () => {
    render(<Button label="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('navigates when clicked', () => {
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);


    render(<Button label="Click me" to="/path" />);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith('/path');
  });
});
