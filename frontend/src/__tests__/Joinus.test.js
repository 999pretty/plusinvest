import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axiosMock from 'axios';

import Joinus from 'components/joinus/Joinus';
import AppProviders from 'context/AppProviders';

beforeEach(() => {
  axiosMock.get.mockResolvedValue({
    data: {
      rates: 1,
    },
  });
});

test('Joinus component renders successfuly', async () => {
  await act(async () => {
    render(<Joinus />, { wrapper: AppProviders });
  });
  expect(
    screen.getByRole('heading', { name: /join us by filling the form:/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /submit form/i })
  ).toBeInTheDocument();
});
