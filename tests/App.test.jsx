import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import store from '../src/redux/store';
import App from '../src/views/App';

describe('App', () => {
  it('should have wellcome message', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Ecommerce Legends/i)).toBeInTheDocument();
  });
});
