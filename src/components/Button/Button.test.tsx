import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import Button from './Button';

// Mock icon component
const MockIcon = () => <svg data-testid="mock-icon" />;

describe('Button Component', () => {
  // Test rendering
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('c-btn -primary');
    expect(button).not.toHaveClass('-disabled');
    expect(button).not.toHaveClass('-loading');
    expect(button).toHaveAttribute('type', 'button');
  });

  // Test disabled state
  test('renders in disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('-disabled');
    expect(button).toBeDisabled();
  });

  // Test loading state
  test('renders in loading state correctly', () => {
    render(<Button loading>Loading Button</Button>);

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('-loading');
    expect(button).toHaveClass('-disabled');
    expect(button).toBeDisabled();
  });

  // Test click handler
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test disabled button doesn't call onClick
  test('does not call onClick when button is disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test loading button doesn't call onClick
  test('does not call onClick when button is loading', () => {
    const handleClick = jest.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading Button
      </Button>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test different layouts
  test('renders with secondary layout correctly', () => {
    render(<Button layout="secondary">Secondary Button</Button>);

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('-secondary');
    expect(button).not.toHaveClass('-primary');
  });

  test('renders with borderLess layout correctly', () => {
    render(<Button layout="borderLess">Borderless Button</Button>);

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('-borderLess');
    expect(button).not.toHaveClass('-primary');
  });

  // Test custom CSS
  test('applies custom CSS class correctly', () => {
    render(<Button css="custom-class">Custom CSS Button</Button>);

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('custom-class');
  });

  // Test left icon
  test('renders with left icon correctly', () => {
    render(
      <Button icon={<MockIcon />} iconPosition="left">
        Button with Left Icon
      </Button>,
    );

    const button = screen.getByTestId('button');
    const icon = screen.getByTestId('mock-icon');
    const iconContainer = icon.closest('span');

    expect(icon).toBeInTheDocument();
    expect(iconContainer).toHaveClass('c-btn-icon');
    expect(button.firstElementChild).toBe(iconContainer);
  });

  // Test right icon
  test('renders with right icon correctly', () => {
    render(
      <Button icon={<MockIcon />} iconPosition="right">
        Button with Right Icon
      </Button>,
    );

    const button = screen.getByTestId('button');
    const icon = screen.getByTestId('mock-icon');
    const iconContainer = icon.closest('span');

    expect(icon).toBeInTheDocument();
    expect(iconContainer).toHaveClass('c-btn-icon');
    expect(button.lastElementChild).toBe(iconContainer);
  });

  // Test edge case with space in type attribute
  test('handles type with space correctly', () => {
    render(<Button type="button ">Button With Space</Button>);

    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
