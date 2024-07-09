import { MediumClient, MediumApiError } from '../src';

describe('MediumClient', () => {
  let client: MediumClient;

  beforeEach(() => {
    client = new MediumClient('fake-token');
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a successful request', async () => {
    const mockResponse = { data: { id: '123', name: 'Test User' } };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await client.request('GET', '/test');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.medium.com/v1/test',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Authorization': 'Bearer fake-token',
        }),
      })
    );
  });

  it('should throw MediumApiError on API error', async () => {
    const errorResponse = {
      errors: [{ message: 'Test error', code: 'test_error' }],
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => errorResponse,
    });

    await expect(client.request('GET', '/test')).rejects.toThrow(MediumApiError);
    
    // await expect(client.request('GET', '/test')).rejects.toThrow(
    //   expect.objectContaining({
    //     status: 400,
    //     errors: errorResponse.errors,
    //   })
    // );
  });
});
