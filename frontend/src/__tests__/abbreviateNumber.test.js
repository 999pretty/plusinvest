import abbreviateNumber from 'helper/abbreviateNumber';

test('abbreviateNumber helper method returns correct abbreviation', () => {
  expect(abbreviateNumber(100000000)).toBe('100M');
  expect(abbreviateNumber(500000)).toBe('500K');
});
