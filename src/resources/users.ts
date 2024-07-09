import { MediumClient } from '../client';
import { User, UserResponse } from '../types';

export default class Users {
  private client: MediumClient;

  constructor(client: MediumClient) {
    this.client = client;
  }

  /**
   * Get details of the authenticated user
   * @returns Promise<User>
   */
  async getMe(): Promise<User> {
    const response = await this.client.request<UserResponse>('GET', '/v1/me');
    return response.data;
  }
}