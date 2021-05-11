const sortOptions = [
  {
    sortOption: 'Name A-Z',
  },
  {
    sortOption: 'Name Z-A',
  },
  {
    sortOption: 'Type A-Z',
  },
  {
    sortOption: 'Type Z-A',
  },
  {
    sortOption: 'Worth ASC',
  },
  {
    sortOption: 'Worth DESC',
  },
];

const sortFunds = (fundsToBeSorted, sortValue) => {
  if (sortValue) {
    switch (sortValue.sortOption) {
      case 'Name A-Z':
        fundsToBeSorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name Z-A':
        fundsToBeSorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Type A-Z':
        fundsToBeSorted.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case 'Type Z-A':
        fundsToBeSorted.sort((a, b) => b.type.localeCompare(a.type));
        break;
      case 'Worth ASC':
        fundsToBeSorted.sort((a, b) => {
          a = a.current_worth_eur;
          b = b.current_worth_eur;
          return a - b;
        });
        break;
      case 'Worth DESC':
        fundsToBeSorted.sort((a, b) => {
          a = a.current_worth_eur;
          b = b.current_worth_eur;
          return b - a;
        });
        break;
      default:
    }
  }
  return fundsToBeSorted;
};

export { sortOptions, sortFunds };
