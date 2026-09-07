import logger from '../logger';
import { apiRequest } from './client';

interface UpdateAppearanceResponse {
   success: boolean;
   message: string;
   data: Record<string, unknown>;
}

export const saveAppearanceChanges = async (
   payload: Record<string, unknown>,
) => {
   try {
      const result = await apiRequest<UpdateAppearanceResponse>(
         `/profile/theme`,
         {
            method: 'PATCH',
            body: payload,
         },
      );

      logger.success('Update appearance response:', result);
      return result;
   } catch (error) {
      logger.error('Update appearance failed:', error);
      throw error;
   }
};

export const changeSocialPosition = async (position: 'top' | 'bottom') => {
   try {
      const result = await apiRequest<UpdateAppearanceResponse>(
         `/profile/social-icon-position`,
         {
            method: 'PATCH',
            body: { position },
         },
      );

      logger.success('Update appearance response:', result);
      return result;
   } catch (error) {
      logger.error('Update appearance failed:', error);
      throw error;
   }
};
