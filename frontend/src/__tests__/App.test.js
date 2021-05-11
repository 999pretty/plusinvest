import { render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import AppProviders from 'context/AppProviders';

import axiosMock from 'axios';

import App from 'App';

beforeEach(() => {
  axiosMock.get.mockResolvedValueOnce({
    data: {
      rates: 1,
    },
  });
});

test('App renders home component correctly', async () => {
  await act(async () => {
    render(<App />, { wrapper: AppProviders });
  });
  expect(
    screen.getByRole('heading', { name: /\+invest/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /art/i })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /invest now/i })
  ).toBeInTheDocument();
});

test('App renders navigation and all nav elements in home route', async () => {
  await act(async () => {
    render(<App />, { wrapper: AppProviders });
  });

  const navigation = screen.getByRole('navigation');

  expect(navigation).toBeInTheDocument();
  expect(
    within(navigation).getByRole('link', {
      name: /About/i,
    })
  ).toBeInTheDocument();
  expect(
    within(navigation).getByRole('link', {
      name: /Profile/i,
    })
  ).toBeInTheDocument();
  expect(
    within(navigation).getByRole('link', {
      name: /Balance/i,
    })
  ).toBeInTheDocument();
  expect(
    within(navigation).getByRole('link', {
      name: /Analytics/i,
    })
  ).toBeInTheDocument();
  expect(
    within(navigation).getByRole('link', {
      name: /Invest now/i,
    })
  ).toBeInTheDocument();
});

test('App renders footer', async () => {
  await act(async () => {
    render(<App />, { wrapper: AppProviders });
  });
  expect(
    screen.getByText(`© ${new Date().getFullYear()} Invest`, { exact: false })
  ).toBeInTheDocument();
});
