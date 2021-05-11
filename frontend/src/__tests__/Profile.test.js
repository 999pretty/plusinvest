import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import axiosMock from 'axios';

import AppProviders from 'context/AppProviders';

import Profile from 'components/profile/Profile';

beforeEach(() => {
  axiosMock.get.mockImplementation((url) => {
    switch (url) {
      case 'http://data.fixer.io/api/latest':
        return Promise.resolve({
          data: {
            rates: 1,
          },
        });
      case '/v1/users':
        return Promise.resolve({
          data: [
            {
              email: 'carl@carlson.com',
              first_name: 'Carl',
              last_name: 'Carlson',
              fund_x: 7000000,
              fund_y: 7000000,
              fund_500: 31000000,
            },
            {
              email: 'd@dson.com',
              first_name: 'David',
              last_name: 'Davidson',
              fund_x: 2000000,
              fund_y: 0,
              fund_500: 22000000,
            },
          ],
        });
      default:
        return Promise.reject(new Error('not found'));
    }
  });
});

test('Profile component renders successfuly', async () => {
  await act(async () => {
    render(<Profile />, { wrapper: AppProviders });
  });
  expect(
    screen.getByRole('heading', { name: /profile\./i })
  ).toBeInTheDocument();
});

test('Profile component renders fetched data', async () => {
  await act(async () => {
    render(<Profile />, { wrapper: AppProviders });
  });
  expect(screen.getByText(/carl carlson/i)).toBeInTheDocument();
  expect(screen.getByText(/david davidson/i)).toBeInTheDocument();
});

test('Profile invest popup works correctly', async () => {
  await act(async () => {
    render(<Profile />, { wrapper: AppProviders });
  });
  expect(screen.getAllByText('invest')[0]).toBeInTheDocument();
  await act(async () => {
    userEvent.click(screen.getAllByText('invest')[0]);
  });
  expect(
    screen.getByRole('heading', { name: /carl carlson/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /submit form/i })
  ).toBeInTheDocument();
});
