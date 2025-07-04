'use server';

import { ContactFormType, ContactItem } from '@/types/contactType';
import { ofetch } from 'ofetch';

export const createContact = async (data: ContactFormType): Promise<{ message: string; contact: ContactItem }> => {
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== ''),
  );

  const res = await ofetch('/contact', {
    method: 'POST',
    baseURL: process.env.API_BASE_URL,
    body: cleanedData,
  });

  return res.data;
};
