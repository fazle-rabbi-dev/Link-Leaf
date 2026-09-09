import { apiRequestWithAuth } from './client';

import type {
   AddCustomLinkSuccessResponse,
   AddSocialLinkSuccessResponse,
   CustomLink,
   CustomLinkIcon,
   DeleteLinkSuccessResponse,
   SocialLink,
   UpdateCustomLinkSuccessResponse,
   UpdateSocialLinkSuccessResponse,
} from '@/@types/links';
import logger from '../logger';

// ============================================================
// === Social Links — /profile/links/social
// ============================================================

export const addSocialLink = async (platform: string, url: string) => {
   try {
      const result = await apiRequestWithAuth<AddSocialLinkSuccessResponse>(
         '/profile/links/social',
         {
            method: 'POST',
            body: { platform, url },
         },
      );

      logger.success('Add social link response:', result);
      return result;
   } catch (error) {
      logger.error('Add social link failed:', error);
      throw error;
   }
};

export const updateSocialLink = async (
   id: string,
   platform: string,
   url: string,
) => {
   try {
      const result = await apiRequestWithAuth<UpdateSocialLinkSuccessResponse>(
         `/profile/links/social/${id}`,
         {
            method: 'PATCH',
            body: { platform, url },
         },
      );

      logger.success('Update social link response:', result);
      return result;
   } catch (error) {
      logger.error('Update social link failed:', error);
      throw error;
   }
};

export const deleteSocialLink = async (id: string) => {
   try {
      const result = await apiRequestWithAuth<DeleteLinkSuccessResponse>(
         `/profile/links/social/${id}`,
         {
            method: 'DELETE',
         },
      );

      logger.success('Delete social link response:', result);
      return result;
   } catch (error) {
      logger.error('Delete social link failed:', error);
      throw error;
   }
};

// ============================================================
// === Custom Links — /profile/links/custom
// ============================================================

interface BuildCustomLinkBodyParams {
   title: string;
   url: string;
   icon?: CustomLinkIcon;
   iconFile?: File;
   shouldRemoveIcon?: boolean;
}

function buildCustomLinkBody({
   title,
   url,
   icon,
   iconFile,
   shouldRemoveIcon,
}: BuildCustomLinkBodyParams): FormData | Record<string, unknown> {
   if (iconFile) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('url', url);
      formData.append('icon', iconFile);
      return formData;
   }

   const body: Record<string, unknown> = {
      title,
      url,
   };
   // don't add icon field when icon.kind is an image (icon kind is image when there's no changes to icon field but already as image it is present)
   if (icon && icon.kind !== 'image') body.icon = icon;
   if (shouldRemoveIcon) body.shouldRemoveIcon = true;
   return body;
}

interface AddCustomLinkParams {
   title: string;
   url: string;
   icon?: CustomLinkIcon;
   iconFile?: File;
}

export const addCustomLink = async ({
   title,
   url,
   icon,
   iconFile,
}: AddCustomLinkParams) => {
   try {
      const body = buildCustomLinkBody({ title, url, icon, iconFile });

      const result = await apiRequestWithAuth<AddCustomLinkSuccessResponse>(
         '/profile/links/custom',
         {
            method: 'POST',
            body,
         },
      );

      logger.success('Add custom link response:', result);
      return result;
   } catch (error) {
      logger.error('Add custom link failed:', error);
      throw error;
   }
};

interface UpdateCustomLinkParams {
   id: string;
   title: string;
   url: string;
   icon?: CustomLinkIcon;
   iconFile?: File;
   shouldRemoveIcon?: boolean;
}

export const updateCustomLink = async ({
   id,
   title,
   url,
   icon,
   iconFile,
   shouldRemoveIcon,
}: UpdateCustomLinkParams) => {
   try {
      const body = buildCustomLinkBody({
         title,
         url,
         icon,
         iconFile,
         shouldRemoveIcon,
      });

      const result = await apiRequestWithAuth<UpdateCustomLinkSuccessResponse>(
         `/profile/links/custom/${id}`,
         {
            method: 'PATCH',
            body,
         },
      );

      logger.success('Update custom link response:', result);
      return result;
   } catch (error) {
      logger.error('Update custom link failed:', error);
      throw error;
   }
};

export const deleteCustomLink = async (id: string) => {
   try {
      const result = await apiRequestWithAuth<DeleteLinkSuccessResponse>(
         `/profile/links/custom/${id}`,
         {
            method: 'DELETE',
         },
      );

      logger.success('Delete custom link response:', result);
      return result;
   } catch (error) {
      logger.error('Delete custom link failed:', error);
      throw error;
   }
};

interface ToggleLinkResponse {
   success: boolean;
   message: string;
   data: {
      link: SocialLink | CustomLink;
   };
}

export const toggleLinkActive = async (
   id: string,
   variant: 'social' | 'custom',
) => {
   try {
      const result = await apiRequestWithAuth<ToggleLinkResponse>(
         `/profile/links/${variant}/${id}/toggle`,
         {
            method: 'PATCH',
            body: {},
         },
      );

      logger.success('Toggle link active response:', result);
      return result;
   } catch (error) {
      logger.error('Toggle link active failed:', error);
      throw error;
   }
};
