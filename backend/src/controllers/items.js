const db = require('../db/queries');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getFunds = async (req, res, next) => {
  try {
    const funds = await db.getAllFunds();
    res.status(200).json(funds);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getFinancials = async (req, res, next) => {
  try {
    const fund_financials = await db.getAllFinancials();
    res.status(200).json(fund_financials);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    await db.postNewUser(
      req.body.email,
      req.body.first_name,
      req.body.last_name
    );
    res.status(200);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putInvest = async (req, res, next) => {
  try {
    await db.putNewInvest(
      req.body.email,
      req.body.fund_x,
      req.body.fund_y,
      req.body.fund_500
    );
    res.status(200).json({
      message: 'Invested successfully.',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putWithdraw = async (req, res, next) => {
  try {
    await db.putNewWithdraw(
      req.body.email,
      req.body.fund_x,
      req.body.fund_y,
      req.body.fund_500
    );
    res.status(200).json({
      message: 'Withdrawn successfully.',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
