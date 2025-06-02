import { shopApiFetch } from '@/server/api';

export function useAuth() {
  const sendOtp = async (mobile: string) => {
    try {
      const response = await shopApiFetch('/auth/authenticate', {
        method: 'POST',
        body: { mobile },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const verifyOtp = async (mobile: string, otp: string) => {
    try {
      const response = await shopApiFetch('/auth/verify-authenticate-otp', {
        method: 'POST',
        body: { mobile, otp },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Invalid OTP');
      }

      const { token } = response.data;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { sendOtp, verifyOtp };
}
