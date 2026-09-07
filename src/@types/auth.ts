export interface Avatar {
   publicId: string | null;
   url: string;
}

export interface RegisteredUser {
   _id: string;
   name: string;
   username: string;
   email: string;
   profile: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
   avatar: Avatar;
}

export interface ValidationErrorDetail {
   field: string;
   message: string;
   location: string;
}

export interface RegisterSuccessResponse {
   success: true;
   message: string;
   data: {
      user: RegisteredUser;
   };
}

export interface RegisterErrorResponse {
   success: false;
   message: string;
   errors?: ValidationErrorDetail[];
}

export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;

// ============================================================
// === Login ===
// ============================================================
export interface LoginSuccessResponse {
   success: true;
   message: string;
   data: {
      user: RegisteredUser;
      accessToken: string;
   };
}

export interface LoginErrorResponse {
   success: false;
   message: string;
   errors?: ValidationErrorDetail[];
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

// ============================================================
// === Fetched User ===
// ============================================================

export interface FetchedUser {
   _id: string;
   name: string;
   username: string;
   email: string;
   avatar: string;
   pendingEmail: string | null;
}

export interface Theme {
   type: 'preset' | 'custom';
   preset?: string;
   custom?: {
      background?: {
         type?: 'color' | 'image' | 'gradient';
         color?: string;
         gradient?: string;
         image?: { url?: string; publicId?: string };
      };
      button?: {
         bgColor?: string;
         fgColor?: string;
         shape?: 'rounded' | 'pill' | 'square';
         style?: 'solid' | 'outline';
      };
      fontName?: string;
      foregroundColor?: string;
   };
}

import type { Links } from './links';

export type { Links, SocialLink, CustomLink } from './links';

export interface FetchedUserProfile {
   _id: string;
   userId: string;
   views: number;
   isPublished: boolean;
   socialIconPosition: 'top' | 'bottom';
   theme: Theme;
   links: Links;
   bio: string;
   createdAt: string;
   updatedAt: string;
}

export interface FetchedUserSuccessResponse {
   success: true;
   message: string;
   data: {
      user: FetchedUser;
      profile: FetchedUserProfile;
   };
}

export interface FetchedUserErrorResponse {
   success: false;
   message: string;
   data: {
      user: null;
      profile: null;
   };
}

export type FetchedUserResponse =
   FetchedUserSuccessResponse | FetchedUserErrorResponse;

export type LogoutResponse = {
   success: true;
   message: string;
};

export interface RefreshTokenSuccessResponse {
   success: true;
   message: string;
   data: {
      accessToken: string;
   };
}

// ============================================================
// === Update User ===
// ============================================================
export interface UpdateUserSuccessResponse {
   success: true;
   message: string;
   data: {
      user: FetchedUserSuccessResponse['data']['user'];
      profile: FetchedUserSuccessResponse['data']['profile'];
   };
}

export interface UpdateUserErrorResponse {
   success: false;
   message: string;
   data: {
      user: null;
      profile: null;
   };
}

export type UpdateUserResponse =
   UpdateUserSuccessResponse | UpdateUserErrorResponse;
