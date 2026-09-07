import { LoginFormData, RegisterFormData } from '@/validations/auth.validation';
import { apiRequest, type ApiResult } from './client';
import type {
   FetchedUserResponse,
   FetchedUserSuccessResponse,
   LoginResponse,
   LogoutResponse,
   RefreshTokenSuccessResponse,
   RegisterResponse,
   UpdateUserResponse,
} from '@/@types/auth';
import { toast } from 'sonner';
import logger from '../logger';
import { ProfileFormData } from '@/validations/profile.validation';

// Helper to detect if value is email or username
const identifyLoginType = (value: string) => {
   const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
   const isUsername =
      /^[a-z0-9_]{3,30}$/.test(value) &&
      !value.startsWith('_') &&
      !value.endsWith('_');
   return isEmail ? 'email' : 'username';
};

export const registerUser = async (formData: RegisterFormData) => {
   try {
      const result = await apiRequest<RegisterResponse>('/auth/register', {
         method: 'POST',
         body: formData,
      });

      console.log('Registration response:', result);
      return result;
   } catch (error) {
      console.error('Registration failed:', error);
      throw error;
   }
};

export const loginUser = async (formData: LoginFormData) => {
   try {
      // Identify if the identifier is email or username
      const loginType = identifyLoginType(formData.emailOrUsername);

      const result = await apiRequest<LoginResponse>('/auth/login', {
         method: 'POST',
         body: {
            ...formData,
            // Send identified type so backend knows how to process
            [loginType]: formData.emailOrUsername, // e.g: email: input value
         },
      });

      console.log('Login response:', result);
      return result;
   } catch (error) {
      console.error('Login failed:', error);
      throw error;
   }
};

type LoginWithSocialData = {
   provider: 'github' | 'google';
   userId: string;
};

export const loginUserWithSocial = async (loginData: LoginWithSocialData) => {
   try {
      const { provider, userId } = loginData;

      const result = await apiRequest<LoginResponse>('/auth/social-login', {
         method: 'POST',
         body: {
            provider,
            userId,
         },
      });

      console.log('Social login response:', result);
      toast.success('Login successful');
      return result;
   } catch (error) {
      console.error('Social login failed:', error);
      toast.error('Login failed. Try again later');
      throw error;
   }
};

export const logoutUser = async () => {
   try {
      const result = await apiRequest<LogoutResponse>('/auth/logout', {
         method: 'DELETE',
      });

      console.log('Logout response:', result);
      if (result.body.success) {
         toast.success('You have been logged out');
      } else {
         toast.error('Logout failed');
      }
      return result;
   } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
   }
};

// ============================================================
// === Fetch LoggedIn User + Refresh Token ===
// ============================================================

type GetLoggedInUserParams = {
   Cookie?: string;
};

// ApiResult<FetchedUserSuccessResponse> + the raw refresh Response so proxy
// can forward Set-Cookie to the browser
type GetLoggedInUserResult = ApiResult<FetchedUserResponse> & {
   refreshResponse: Response | null;
};

export const getLoggedInUser = async (
   headers: GetLoggedInUserParams = {},
   source?: string,
): Promise<GetLoggedInUserResult> => {
   logger.success('getLoggedInUser fired & called from:', source || 'proxy');
   let result;
   let refreshResponse: Response | null = null;

   try {
      result = await apiRequest<FetchedUserResponse>('/users/me', {
         headers,
      });

      // if fetching user failed: refresh the token
      if (!result.body.success) {
         // it's ok to use: type -> FetchedUserSuccessResponse here since both contains same shape
         console.log({ headers });
         logger.info('started refreshing token with', headers);

         const res = await apiRequest<RefreshTokenSuccessResponse>(
            '/auth/refresh-token',
            {
               method: 'POST',
               body: {},
               headers,
            },
         );
         refreshResponse = res.response;

         // if refresh token fails: need to redirect to auth page
         if (!res.body.success) {
            logger.error('refresh token failed:', res.body);
            return {
               response: res.response,
               body: {
                  success: false,
                  message: 'Refresh token failed',
                  data: {
                     user: null,
                     profile: null,
                  },
               },
               refreshResponse: null,
            };
         }

         // if token refreshed successfully: fetch user again
         // 🚨 but with new accessToken because refresh only happens when no valid accessToken
         logger.info('token refreshed successfully');
         result = await apiRequest<FetchedUserSuccessResponse>('/users/me', {
            headers: {
               Cookie: `accessToken=${res.body.data.accessToken}`,
            },
         });
      }

      return { ...result, refreshResponse };
   } catch (error) {
      logger.error('Fetching user failed:', error);
      throw error;
   }
};

export const updateUser = async (formData: FormData | ProfileFormData) => {
   try {
      const result = await apiRequest<UpdateUserResponse>('/users/me', {
         method: 'PATCH',
         body: formData,
      });

      logger.success('Update user response:', result);
      return result;
   } catch (error) {
      logger.error('Update user failed:', error);
      throw error;
   }
};

// ============================================================
// === Resend Verification Email ===
// ============================================================

export type ResendVerificationResult = {
   success: boolean;
   message: string;
};

export const ResendVerificationEmail = async (email: string) => {
   try {
      const result = await apiRequest<ResendVerificationResult>(
         '/auth/resend-verification-email',
         {
            method: 'POST',
            body: { email },
         },
      );

      logger.success('Resend verification email response:', result);
      return result;
   } catch (error) {
      logger.error('Resend verification email failed:', error);
      throw error;
   }
};

type VerifyEmailResponse = {
   success: boolean;
   message: string;
};

export const verifyEmail = async (token: string) => {
   try {
      if (!token) throw new Error('Token is required');

      const result = await apiRequest<VerifyEmailResponse>(
         `/auth/verify-email`,
         {
            method: 'POST',
            body: { token },
         },
      );

      logger.success('Verify email response:', result);
      return result;
   } catch (error) {
      logger.error('Verify email failed:', error);
      throw error;
   }
};

// ============================================================
// === Forgot Password ===
// ============================================================

type ForgotPasswordResult = {
   success: boolean;
   message: string;
};

export const ForgotPasswordEmail = async (email: string) => {
   try {
      const result = await apiRequest<ForgotPasswordResult>(
         '/auth/forgot-password',
         {
            method: 'POST',
            body: { email },
         },
      );

      logger.success('Forgot password response:', result);
      return result;
   } catch (error) {
      logger.error('Forgot password failed:', error);
      throw error;
   }
};

// ============================================================
// === Reset Password ===
// ============================================================

type ResetPasswordResponse = {
   success: boolean;
   message: string;
};

export const resetPassword = async (token: string, newPassword: string) => {
   try {
      if (!token) throw new Error('Token is required');

      const result = await apiRequest<ResetPasswordResponse>(
         '/auth/reset-password',
         {
            method: 'POST',
            body: { token, newPassword },
         },
      );

      logger.success('Reset password response:', result);
      return result;
   } catch (error) {
      logger.error('Reset password failed:', error);
      throw error;
   }
};
