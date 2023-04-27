import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';

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
