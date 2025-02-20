import React from 'react';
import { render, screen } from '@testing-library/react';

import { Typography } from './Typography';

describe('Typography Component', () => {
  test('renders the correct tag', () => {
    const { container } = render(<Typography tag="h1">Hello World</Typography>);

    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello World');
  });

  test('renders a paragraph', () => {
    const { container } = render(
      <Typography tag="p">This is a paragraph</Typography>,
    );

    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('This is a paragraph');
  });

  test('applies additional class names', () => {
    render(
      <Typography tag="h2" classNames={['custom-class']}>
        Styled Heading
      </Typography>,
    );

    const heading = screen.getByText('Styled Heading');
    expect(heading).toHaveClass('custom-class');
  });

  test('renders children correctly', () => {
    render(<Typography tag="h3">Dynamic Text</Typography>);

    expect(screen.getByText('Dynamic Text')).toBeInTheDocument();
  });
});
