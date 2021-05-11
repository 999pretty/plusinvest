import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import axiosMock from 'axios';

import UserForm from 'components/shared/UserForm';

import AppProviders from 'context/AppProviders';

beforeEach(() => {
  axiosMock.get.mockResolvedValue({
    data: {
      rates: 1,
    },
  });
});

const sampleUser = {
  email: 'carl@carlson.com',
  first_name: 'Carl',
  last_name: 'Carlson',
};

test('UserForm component renders successfully', async () => {
  const mockOnSubmit = jest.fn((data) => data);
  const handleSubmit = jest.fn((data) => data);

  await act(async () => {
    await render(<UserForm onSubmit={handleSubmit(mockOnSubmit)} />, {
      wrapper: AppProviders,
    });
  });

  expect(screen.getByPlaceholderText(/First name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
});

test('UserForm calls the onSubmit function', async () => {
  const mockOnSubmit = jest.fn((data) => data);
  const handleSubmit = jest.fn((data) => data);
  render(<UserForm onSubmit={handleSubmit(mockOnSubmit)} />, {
    wrapper: AppProviders,
  });

  await act(async () => {
    userEvent.type(
      screen.getByPlaceholderText(/First name/i),
      sampleUser.firstName
    );
    userEvent.type(
      screen.getByPlaceholderText(/Last name/i),
      sampleUser.lastName
    );
    userEvent.type(screen.getByPlaceholderText(/Email/i), sampleUser.email);
  });

  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /submit form/i }));
  });

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
