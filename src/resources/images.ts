import { MediumClient } from '../client';
import { Image, ImageResponse } from '../types';
import FormData from 'form-data';

export default class Images {
  private client: MediumClient;

  constructor(client: MediumClient) {
    this.client = client;
  }

  /**
   * Uploads an image
   * @param imageBuffer - The image data as a Buffer
   * @param filename - The name of the file
   * @param mimeType - The MIME type of the image
   * @returns Promise<Image>
   */
  async upload(imageBuffer: Buffer, filename: string, mimeType: string): Promise<Image> {
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename,
      contentType: mimeType,
    });

    const response = await this.client.request<ImageResponse>('POST', '/v1/images', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response.data;
  }
}