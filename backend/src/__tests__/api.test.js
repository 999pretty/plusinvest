const fetch = require('node-fetch');
const { serverUrL } = require('./config');

/**
 * Feel free to extend this test suite
 */
describe('API Endpoint Tests', function () {
  it('Non existing endpoint returning 404', async function () {
    const res = await fetch(`${serverUrL}/v1/non-existing`);
    expect(res.status).toEqual(404);
  });
});
