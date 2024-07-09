import { MediumClient } from '../../src/client';
import Users from '../../src/resources/users';
import { User } from '../../src/types';

jest.mock('../../src/client');

describe('Users', () => {
  let client: jest.Mocked<MediumClient>;
  let users: Users;

  beforeEach(() => {
    client = new MediumClient('fake-token') as jest.Mocked<MediumClient>;
    users = new Users(client);
  });

  it('should get authenticated user', async () => {
    const mockUser: User = {
      id: '123',
      username: 'testuser',
      name: 'Test User',
      url: 'https://medium.com/@testuser',
      imageUrl: 'https://medium.com/images/testuser.jpg',
    };

    client.request.mockResolvedValueOnce({ data: mockUser });

    const result = await users.getMe();
    expect(result).toEqual(mockUser);
    expect(client.request).toHaveBeenCalledWith('GET', '/v1/me');
  });
});