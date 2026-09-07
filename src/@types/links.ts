export interface SaveSocialLink {
   _id?: string;
   platform: string;
   url: string;
}

export interface SocialLink {
   _id: string;
   platform: string;
   url: string;
   isActive: boolean;
   order: number;
}

export interface CustomLinkIcon {
   kind: 'emoji' | 'gif' | 'image';
   value: string;
}

export interface CustomLink {
   _id?: string;
   title: string;
   url: string;
   icon?: CustomLinkIcon;
   isActive: boolean;
   order: number;
}

export interface SaveCustomLink {
   _id?: string;
   title: string;
   url: string;
   icon?: CustomLinkIcon;
}

export interface Links {
   social: SocialLink[];
   custom: CustomLink[];
}

// -----------------------------------------------------------------------------
// Add Link
// -----------------------------------------------------------------------------

export type CustomLinkSaveHandler = (
   link: SaveCustomLink,
   iconFile?: File,
   shouldRemoveIcon?: boolean,
) => void;

interface SocialLinkSuccessResponse {
   success: true;
   message: string;
   data: {
      link: SocialLink;
   };
}
export type AddSocialLinkSuccessResponse = SocialLinkSuccessResponse;
export type UpdateSocialLinkSuccessResponse = SocialLinkSuccessResponse;

// delete link success response
export interface DeleteLinkSuccessResponse {
   success: true;
   message: 'Social link deleted successfully';
}

interface CustomLinkSuccessResponse {
   success: true;
   message: string;
   data: {
      link: CustomLink;
   };
}
export type AddCustomLinkSuccessResponse = CustomLinkSuccessResponse;
export type UpdateCustomLinkSuccessResponse = CustomLinkSuccessResponse;
