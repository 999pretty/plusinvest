const errorMiddleware = require('../utils/errorMiddleware');
const { buildReq, buildRes, buildNext } = require('./utils/generate');

describe('Node tests', () => {
  test('Error middleware responds on error with status 500 correctly', () => {
    const res = buildRes();
    const req = buildReq();
    const next = buildNext();
    const data = 'fake_data';
    const message = 'Fake Error Message';
    const error = new Error({ message }, data);

    errorMiddleware(error, req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
      data: error.data,
    });
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
