export enum ContentFormat {
    HTML = 'html',
    MARKDOWN = 'markdown'
  }
  
  export enum PublishStatus {
    PUBLIC = 'public',
    DRAFT = 'draft',
    UNLISTED = 'unlisted'
  }
  
  export enum LicenseType {
    ALL_RIGHTS_RESERVED = 'all-rights-reserved',
    CC_40_BY = 'cc-40-by',
    CC_40_BY_SA = 'cc-40-by-sa',
    CC_40_BY_ND = 'cc-40-by-nd',
    CC_40_BY_NC = 'cc-40-by-nc',
    CC_40_BY_NC_ND = 'cc-40-by-nc-nd',
    CC_40_BY_NC_SA = 'cc-40-by-nc-sa',
    CC_40_ZERO = 'cc-40-zero',
    PUBLIC_DOMAIN = 'public-domain'
  }
  
  export enum ContributorRole {
    EDITOR = 'editor',
    WRITER = 'writer'
  }
  
  export interface User {
    id: string;
    username: string;
    name: string;
    url: string;
    imageUrl: string;
  }
  
  export interface UserResponse {
    data: User;
  }
  
  export interface Publication {
    id: string;
    name: string;
    description: string;
    url: string;
    imageUrl: string;
  }
  
  export interface PublicationResponse {
    data: Publication[];
  }
  
  export interface Contributor {
    publicationId: string;
    userId: string;
    role: ContributorRole;
  }
  
  export interface ContributorResponse {
    data: Contributor[];
  }
  
  export interface Post {
    id: string;
    title: string;
    authorId: string;
    tags: string[];
    url: string;
    canonicalUrl?: string;
    publishStatus: PublishStatus;
    publishedAt?: number;
    license: LicenseType;
    licenseUrl: string;
  }
  
  export interface PostResponse {
    data: Post;
  }
  
  export interface CreatePostOptions {
    title: string;
    contentFormat: ContentFormat;
    content: string;
    tags?: string[];
    canonicalUrl?: string;
    publishStatus?: PublishStatus;
    license?: LicenseType;
    notifyFollowers?: boolean;
  }
  
  export interface Image {
    url: string;
    md5: string;
  }
  
  export interface ImageResponse {
    data: Image;
  }
  
  export interface MediumErrorResponse {
    errors: {
      message: string;
      code: string;
    }[];
  }
  
  export class MediumApiError extends Error {
    constructor(
      public status: number,
      public errors: MediumErrorResponse['errors']
    ) {
      super(`Medium API Error (${status}): ${errors.map(e => e.message).join(', ')}`);
      this.name = 'MediumApiError';
    }
  }