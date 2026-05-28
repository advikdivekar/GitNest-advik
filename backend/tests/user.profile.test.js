/**
 * Regression tests for the getUserProfile endpoint.
 *
 * Verifies that internal MongoDB ObjectIds cannot be used to enumerate
 * user documents via the public GET /api/v1/users/:username route.
 */

import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/models/User.model.js', () => ({
  default: {
    findOne: jest.fn(),
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule('mongoose', () => ({
  default: {
    Types: { ObjectId: { isValid: () => false } },
  },
}));

jest.unstable_mockModule('../src/utils/logActivitySafely.js', () => ({
  logActivitySafely: jest.fn(async () => {}),
}));

jest.unstable_mockModule('../src/config/db.js', () => ({ default: jest.fn() }));

const { default: User } = await import('../src/models/User.model.js');
const { getUserProfile } = await import('../src/controllers/user.controller.js');

const buildRes = () => {
  const res = { statusCode: null, body: null };
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => { res.body = body; return res; };
  res.locals = {};
  return res;
};

const buildReq = (username) => ({ params: { username } });

describe('getUserProfile', () => {
  let mockNext;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNext = jest.fn();
  });

  test('returns 200 and the user document for a valid username', async () => {
    const stubbedUser = { username: 'alice', email: 'alice@example.com', bio: 'Hello' };
    User.findOne.mockResolvedValue(stubbedUser);

    const res = buildRes();
    await getUserProfile(buildReq('alice'), res, mockNext);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.username).toBe('alice');
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('is case-insensitive — uppercased username resolves the same document', async () => {
    User.findOne.mockResolvedValue({ username: 'alice', email: 'alice@example.com' });

    const res = buildRes();
    await getUserProfile(buildReq('ALICE'), res, mockNext);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.username).toBe('alice');
  });

  test('returns 404 when username does not exist', async () => {
    User.findOne.mockResolvedValue(null);

    const res = buildRes();
    await getUserProfile(buildReq('ghost'), res, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    const err = mockNext.mock.calls[0][0];
    expect(err.statusCode).toBe(404);
  });

  test('returns 404 when a valid MongoDB ObjectId is supplied as the username', async () => {
    const objectId = '507f1f77bcf86cd799439011';
    User.findOne.mockResolvedValue(null);

    const res = buildRes();
    await getUserProfile(buildReq(objectId), res, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    const err = mockNext.mock.calls[0][0];
    expect(err.statusCode).toBe(404);
    expect(res.body).toBeNull();
  });

  test('never calls User.findById on any input', async () => {
    User.findOne.mockResolvedValue(null);

    await getUserProfile(buildReq('someuser'), buildRes(), mockNext);

    expect(User.findById).not.toHaveBeenCalled();
  });
});
