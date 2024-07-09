import { MediumClient } from '../client';
import { Post, PostResponse, CreatePostOptions, ContentFormat, PublishStatus, LicenseType } from '../types';

export default class Posts {
  private client: MediumClient;

  constructor(client: MediumClient) {
    this.client = client;
  }

  async create(authorId: string, options: CreatePostOptions): Promise<Post> {
    const response = await this.client.request<PostResponse>('POST', `/v1/users/${authorId}/posts`, options);
    return response.data;
  }

  async createUnderPublication(publicationId: string, options: CreatePostOptions): Promise<Post> {
    const response = await this.client.request<PostResponse>('POST', `/v1/publications/${publicationId}/posts`, options);
    return response.data;
  }
}

export { ContentFormat, PublishStatus, LicenseType };