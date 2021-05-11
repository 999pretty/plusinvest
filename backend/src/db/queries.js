const knex = require('./knex');

function getAllFunds() {
  return knex('fund').select('*');
}

function getAllUsers() {
  return knex('user').select('*');
}

function getAllFinancials() {
  return knex('fund_financials')
    .select(
      'fund_financial.id',
      'amount',
      'currency',
      'created_at',
      'fund_financial.type',
      'name'
    )
    .from('fund')
    .join('fund_financial', function () {
      this.on('fund.id', '=', 'fund_financial.fund_fk');
    });
}

function postNewUser(email, first_name, last_name) {
  return knex('user').insert({
    email: email,
    first_name: first_name,
    last_name: last_name,
    fund_x: 0,
    fund_y: 0,
    fund_500: 0,
  });
}

const updateFundAndFinancial = (passedFund, passedId, passedType) => {
  if (passedFund !== 0) {
    knex('fund_financial')
      .insert({
        amount: passedFund,
        fund_fk: passedId,
        type: passedType,
        created_at: knex.raw('CURRENT_TIMESTAMP'),
        currency: 'EUR',
      })
      .then(() => {
        knex('public.fund')
          .increment('current_worth_eur', passedFund)
          .where('id', passedId);
      });
  }
};

function putNewInvest(email, fund_x, fund_y, fund_500) {
  return knex('user')
    .increment('fund_x', fund_x)
    .increment('fund_y', fund_y)
    .increment('fund_500', fund_500)
    .where('email', '=', email)
    .then(() => {
      updateFundAndFinancial(fund_x, 1, 'CREDIT');
    })
    .then(() => {
      updateFundAndFinancial(fund_y, 2, 'CREDIT');
    })
    .then(() => {
      updateFundAndFinancial(fund_500, 7, 'CREDIT');
    });
}

function putNewWithdraw(email, fund_x, fund_y, fund_500) {
  return knex('user')
    .decrement('fund_x', fund_x)
    .decrement('fund_y', fund_y)
    .decrement('fund_500', fund_500)
    .where('email', '=', email)
    .then(() => {
      updateFundAndFinancial(fund_x, 1, 'DEBIT');
    })
    .then(() => {
      updateFundAndFinancial(fund_y, 2, 'DEBIT');
    })
    .then(() => {
      updateFundAndFinancial(fund_500, 7, 'DEBIT');
    });
}

module.exports = {
  getAllFunds,
  getAllUsers,
  getAllFinancials,
  postNewUser,
  putNewInvest,
  putNewWithdraw,
};
