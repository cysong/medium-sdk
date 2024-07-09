import { MediumClient } from '../client';
import { Publication, PublicationResponse, Contributor, ContributorResponse, ContributorRole } from '../types';

export default class Publications {
  private client: MediumClient;

  constructor(client: MediumClient) {
    this.client = client;
  }

  async list(userId: string): Promise<Publication[]> {
    const response = await this.client.request<PublicationResponse>('GET', `/v1/users/${userId}/publications`);
    return response.data;
  }

  async contributors(publicationId: string): Promise<Contributor[]> {
    const response = await this.client.request<ContributorResponse>('GET', `/v1/publications/${publicationId}/contributors`);
    return response.data;
  }
}

export { ContributorRole };