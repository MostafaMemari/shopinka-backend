export interface ContactFormType {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactItem {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  message: string;
  createdAt: string;
}
