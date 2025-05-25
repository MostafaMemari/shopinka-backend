export type user = {
  id: 1;
  fullName: string | number;
  mobile: string;
  perviousMobile: null;
  lastMobileChange: string | null;
  isVerifiedMobile: boolean;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'CUSTOMER';
  createdAt: string;
  updatedAt: string;
};
