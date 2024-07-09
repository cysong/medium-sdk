import { MediumClient } from '../../src/client';
import Publications from '../../src/resources/publications';
import { Publication, PublicationResponse, Contributor, ContributorResponse, ContributorRole } from '../../src/types';

jest.mock('../../src/client');

describe('Publications', () => {
  let client: jest.Mocked<MediumClient>;
  let publications: Publications;

  beforeEach(() => {
    client = new MediumClient('fake-token') as jest.Mocked<MediumClient>;
    publications = new Publications(client);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should list publications for a user', async () => {
    const mockPublications: Publication[] = [
      {
        id: 'pub123',
        name: 'Test Publication',
        description: 'A test publication',
        url: 'https://medium.com/test-publication',
        imageUrl: 'https://medium.com/test-publication/image.jpg',
      },
    ];

    const response: PublicationResponse = {
      data: mockPublications,
    };

    client.request.mockResolvedValueOnce(response);

    const result = await publications.list('user123');
    expect(result).toEqual(mockPublications);
    expect(client.request).toHaveBeenCalledWith('GET', '/v1/users/user123/publications');
  });

  it('should list contributors for a publication', async () => {
    const mockContributors: Contributor[] = [
      {
        publicationId: 'pub123',
        userId: 'user123',
        role: ContributorRole.EDITOR,
      },
    ];

    const response: ContributorResponse = {
      data: mockContributors,
    };

    client.request.mockResolvedValueOnce(response);

    const result = await publications.contributors('pub123');
    expect(result).toEqual(mockContributors);
    expect(client.request).toHaveBeenCalledWith('GET', '/v1/publications/pub123/contributors');
  });
});
