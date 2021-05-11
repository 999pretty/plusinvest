import { sortFunds } from 'helper/sortFunds';

const sampleFunds = [
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
  {
    id: 3,
    name: 'EQT Z',
    description:
      'Encompasses investments mainly within the public value segment',
    type: 'ETF',
    init_worth_eur: 8000000000,
    current_worth_eur: 8000000000,
  },
];

let sampleSortValue = {
  sortOption: 'Name Z-A',
};

test('sortFunds helper method returns values in correct order', () => {
  let sorted = sortFunds(sampleFunds, sampleSortValue);
  expect(sorted[0].name).toBe('EQT Z');
});
