import { render, screen } from '@testing-library/react';

import AppProviders from 'context/AppProviders';

import About from 'components/about/About';

test('About renders home component correctly', async () => {
  await render(<About />, { wrapper: AppProviders });
  expect(
    screen.getByRole('heading', {
      name: /a simple way to look after your money\./i,
    })
  ).toBeInTheDocument();
});
