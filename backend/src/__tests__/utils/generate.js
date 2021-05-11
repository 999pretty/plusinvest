const faker = require('faker');

function buildReq({ ...overrides } = {}) {
  const req = { body: {}, params: {}, ...overrides };
  return req;
}

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  };
  return res;
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next');
}

module.exports = { buildReq, buildRes, buildNext };
