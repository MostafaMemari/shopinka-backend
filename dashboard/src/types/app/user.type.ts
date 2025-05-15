export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}

export type User = {
  id: 1
  fullName: string | null
  mobile: string
  perviousMobile: null
  lastMobileChange: null
  isVerifiedMobile: boolean
  role: UserRole
  createdAt: string
  updatedAt: string
}
