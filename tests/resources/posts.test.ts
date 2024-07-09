import { MediumClient } from '../../src/client';
import Posts from '../../src/resources/posts';
import { Post, CreatePostOptions, ContentFormat, PublishStatus, LicenseType } from '../../src/types';

jest.mock('../../src/client');

describe('Posts', () => {
  let client: jest.Mocked<MediumClient>;
  let posts: Posts;

  beforeEach(() => {
    client = new MediumClient('fake-token') as jest.Mocked<MediumClient>;
    posts = new Posts(client);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a post', async () => {
    const mockPost: Post = {
      id: 'post123',
      title: 'Test Post',
      authorId: 'user123',
      tags: ['test'],
      url: 'https://medium.com/@user/test-post',
      publishStatus: PublishStatus.DRAFT,
      publishedAt: Date.now(),
      license: LicenseType.ALL_RIGHTS_RESERVED,
      licenseUrl: 'https://medium.com/policy/9db0094a1e0f',
    };

    const createOptions: CreatePostOptions = {
      title: 'Test Post',
      content: 'This is a test post',
      contentFormat: ContentFormat.MARKDOWN,
      publishStatus: PublishStatus.DRAFT,
    };

    client.request.mockResolvedValueOnce({ data: mockPost });

    const result = await posts.create('user123', createOptions);
    expect(result).toEqual(mockPost);
    expect(client.request).toHaveBeenCalledWith('POST', '/v1/users/user123/posts', createOptions);
  });

  it('should create a post under a publication', async () => {
    const mockPost: Post = {
      id: 'post123',
      title: 'Test Post',
      authorId: 'user123',
      tags: ['test'],
      url: 'https://medium.com/@user/test-post',
      publishStatus: PublishStatus.DRAFT,
      publishedAt: Date.now(),
      license: LicenseType.ALL_RIGHTS_RESERVED,
      licenseUrl: 'https://medium.com/policy/9db0094a1e0f',
    };

    const createOptions: CreatePostOptions = {
      title: 'Test Post',
      content: 'This is a test post',
      contentFormat: ContentFormat.MARKDOWN,
      publishStatus: PublishStatus.DRAFT,
    };

    (client.request as jest.Mock).mockResolvedValueOnce({ data: mockPost });

    const result = await posts.createUnderPublication('publication123', createOptions);
    expect(result).toEqual(mockPost);
    expect(client.request).toHaveBeenCalledWith('POST', '/v1/publications/publication123/posts', createOptions);
  });
});