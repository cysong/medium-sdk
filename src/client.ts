// src/client.ts

import Users from './resources/users';
import Publications from './resources/publications';
import Posts from './resources/posts';
import Images from './resources/images';
import { MediumApiError, MediumErrorResponse } from './types';

export class MediumClient {
  private accessToken: string;
  public users: Users;
  public publications: Publications;
  public posts: Posts;
  public images: Images;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.users = new Users(this);
    this.publications = new Publications(this);
    this.posts = new Posts(this);
    this.images = new Images(this);
  }

  async request<T>(method: string, endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const url = `https://api.medium.com/v1${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      ...options?.headers,
    };

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
        let errorResponse: MediumErrorResponse;
        try {
          errorResponse = await response.json();
        } catch (e) {
          throw new MediumApiError(response.status, [{ message: 'Unknown error', code: 'unknown' }]);
        }
        throw new MediumApiError(response.status, errorResponse.errors);
      }

    return response.json();
  }
}