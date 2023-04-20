import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('should have wellcome message', () => {
    render(<App />);
    expect(screen.getByText(/ecommerce legend/i));
  });
});
