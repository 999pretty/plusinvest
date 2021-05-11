import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axiosMock from 'axios';

import AppProviders from 'context/AppProviders';

import Investnow from 'components/investnow/Investnow';

beforeEach(() => {
  axiosMock.get.mockImplementation((url) => {
    switch (url) {
      case 'http://data.fixer.io/api/latest':
        return Promise.resolve({
          data: {
            rates: 1,
          },
        });
      case '/v1/funds':
        return Promise.resolve({
          data: [
            {
              id: 1,
              name: 'EQT X',
              description:
                'Encompasses investments mainly within the public value segment',
              type: 'Index Fund',
              init_worth_eur: 10000000000,
              current_worth_eur: 10336230960,
            },
            {
              id: 2,
              name: 'EQT Y',
              description:
                'Encompasses investments mainly within the real estate segment',
              type: 'Index Fund',
              init_worth_eur: 10000000000,
              current_worth_eur: 10263499845,
            },
          ],
        });
      default:
        return Promise.reject(new Error('not found'));
    }
  });
});

test('Investnow component renders successfuly', async () => {
  await act(async () => {
    render(<Investnow />, { wrapper: AppProviders });
  });
  expect(screen.getByText('NAME')).toBeInTheDocument();
  expect(screen.getByText('TYPE')).toBeInTheDocument();
  expect(screen.getByText('SORT')).toBeInTheDocument();
});

test('Investnow component renders fetched data', async () => {
  await act(async () => {
    render(<Investnow />, { wrapper: AppProviders });
  });
  expect(screen.getByText('EQT Y', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('EQT X', { exact: false })).toBeInTheDocument();
});
