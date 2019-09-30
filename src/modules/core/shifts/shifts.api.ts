import { baseUrl } from '../api';

// TODO - Handle error from API
export const fetchShifts = () => {
  return fetch(`${baseUrl}/shifts`)
  .then(response => response.json());
};

export const bookShift = (shiftId: string) => {
  return fetch(`${baseUrl}/shifts/${shiftId}/book`, {
    method: 'POST'
  }).then(response => response.json());
};