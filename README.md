# Medium SDK

`medium-sdk` is a TypeScript client library for interacting with the official Medium SDK. This project is based on the [Medium API documentation](https://github.com/Medium/medium-api-docs).

## Installation

Install `medium-sdk` using npm or yarn:

```bash
npm install medium-sdk
```
or
```bash
yarn add medium-sdk
```
## Usage
### Initialize Client
```typescript
import { MediumClient } from 'medium-sdk';

// Instantiate the client
const client = new MediumClient('YOUR_ACCESS_TOKEN');
```
### Get User Information
```typescript
async function getUser() {
  try {
    const user = await client.users.getMe();
    console.log('Authenticated user:', user);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

getUser();
```
### Create a Post
```typescript
import { CreatePostOptions, ContentFormat, PublishStatus, LicenseType } from 'medium-sdk';

async function createPost() {
  const createOptions: CreatePostOptions = {
    title: 'Test Post',
    content: 'This is a test post',
    contentFormat: ContentFormat.MARKDOWN,
    publishStatus: PublishStatus.DRAFT,
    license: LicenseType.ALL_RIGHTS_RESERVED,
  };

  try {
    const post = await client.posts.create('authorId', createOptions);
    console.log('Post created successfully:', post);
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

createPost();
```
### Upload an Image
```typescript
import fs from 'fs';

async function uploadImage() {
  const imageBuffer = fs.readFileSync('path/to/image.jpg');

  try {
    const image = await client.images.upload(imageBuffer, 'image.jpg', 'image/jpeg');
    console.log('Image uploaded successfully:', image);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

uploadImage();
```

## API Overview

### `MediumClient`

The `MediumClient` class is used to interact with the Medium API.

- `constructor(accessToken: string)`
    - `accessToken`: The access token for authentication.

### `Users`

- `getMe(): Promise<User>`
    - Get details of the authenticated user.

### `Posts`

- `create(authorId: string, options: CreatePostOptions): Promise<Post>`
    - Create a new post.
- `createUnderPublication(publicationId: string, options: CreatePostOptions): Promise<Post>`
    - Create a new post under a specific publication.

### `Publications`

- `list(userId: string): Promise<Publication[]>`
    - Get a list of publications for a user.
- `contributors(publicationId: string): Promise<Contributor[]>`
    - Get a list of contributors for a publication.

### `Images`

- `upload(imageBuffer: Buffer, filename: string, mimeType: string): Promise<Image>`
    - Upload an image.

## Test Coverage

The project test coverage is as follows:

| File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|--------------------|-------:|--------:|-------:|-------:|-------------------:|
| src                |  98.36 |   86.66 |  52.94 |  98.03 |                    |
|   client.ts        |  95    |   71.42 | 100    |  95    | 46                 |
|   index.ts         | 100    |  100    |  11.11 | 100    |                    |
|   types.ts         | 100    |  100    | 100    | 100    |                    |
| src/resources      | 100    |  100    |  71.42 | 100    |                    |
|   images.ts        | 100    |  100    | 100    | 100    |                    |
|   posts.ts         | 100    |  100    |  50    | 100    |                    |
|   publications.ts  | 100    |  100    |  75    | 100    |                    |
|   users.ts         | 100    |  100    | 100    | 100    |                    |


## Reference

For detailed information on the Medium API, please refer to the [Medium API documentation](https://github.com/Medium/medium-api-docs).

## Contribution

Contributions are welcome! Please ensure all changes are tested and adhere to the project's coding standards.

## License
`medium-sdk` is licensed under the MIT License. See the [LICENSE](https://github.com/cysong/medium-sdk/blob/main/LICENSE) file for details.
