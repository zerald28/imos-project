// File: resources/js/services/swineService.ts
import axios from 'axios';

export const swineService = {
  getAll: (status: 'active' | 'archive' = 'active') =>
    axios.get(`/swine?status=${status}`),

  get: (id: number) => axios.get(`/swine/${id}`),

  create: (data: any) => axios.post('/swine', data),

  update: (id: number, data: any) => axios.put(`/swine/${id}`, data),

  delete: (id: number) => axios.delete(`/swine/${id}`)
};
