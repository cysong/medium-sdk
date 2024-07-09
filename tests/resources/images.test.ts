import { MediumClient } from '../../src/client';
import Images from '../../src/resources/images';
import { Image, ImageResponse } from '../../src/types';
import FormData from 'form-data';

jest.mock('../../src/client');

describe('Images', () => {
    let client: jest.Mocked<MediumClient>;
    let images: Images;

    beforeEach(() => {
        client = new MediumClient('fake-token') as jest.Mocked<MediumClient>;
        images = new Images(client);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should upload an image', async () => {
        const mockImage: Image = {
            url: 'https://cdn-images-1.medium.com/max/800/0*image.jpg',
            md5: 'd41d8cd98f00b204e9800998ecf8427e',
        };

        const response: ImageResponse = {
            data: mockImage,
        };

        const imageBuffer = Buffer.from('dummy content');
        const mimeType = 'image/png';
        const filename = 'example.png';

        client.request.mockResolvedValueOnce(response);

        const result = await images.upload(imageBuffer, filename, mimeType);
        expect(result).toEqual(mockImage);

        const formData = new FormData();
        formData.append('image', imageBuffer, {
            filename,
            contentType: mimeType,
        });

        expect(client.request).toHaveBeenCalledWith('POST', '/v1/images',
            expect.any(FormData),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'content-type': expect.stringContaining('multipart/form-data'),
                }),
            }));
    });
});
