export interface UserState {
  full_name: string;
  mobile: string;
  role: 'CUSTOMER';
}

export interface User {
  id: number;
  fullName: string | null;
  mobile: string;
  perviousMobile: string | null;
  lastMobileChange: string | null;
  isVerifiedMobile: boolean;
  role: 'CUSTOMER';
  createdAt: string;
  updatedAt: string;
}
