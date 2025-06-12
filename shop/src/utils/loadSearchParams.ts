import { createLoader } from 'nuqs/server';
import { coordinatesSearchParams } from '../config/searchParams.config';

export const loadSearchParams = createLoader(coordinatesSearchParams);
