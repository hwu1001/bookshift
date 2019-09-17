import { baseUrl } from '../api';

export const fetchShifts = () => {
  return fetch(`${baseUrl}/shifts`)
  .then(response => response.json());
};