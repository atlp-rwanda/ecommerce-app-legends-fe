import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from '../src/redux/store';
import { Provider } from 'react-redux';

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
