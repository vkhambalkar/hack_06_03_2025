import _ from 'lodash';

const updateBankCoverageRate = (arr, bankName, newRate) => {
  const updated = _.cloneDeep(arr); // Deep copy to avoid mutation
  const index = _.findIndex(updated, { name: bankName });

  if (index !== -1) {
    _.set(updated[index], 'coverageRate', newRate);
  }

  return updated;
};

// Usage
const updatedBanks = updateBankCoverageRate(banks, "Citibank", 3.1);
console.log(updatedBanks);
