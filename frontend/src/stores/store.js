import { create } from 'zustand';
import axios from 'axios';

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

export const useGetTeachers = create((set, get) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.get('http://localhost:8080/teachers');
      set({ ...initialState, success: true, data: res.data });
      console.log(res.data);
    } catch (err) {
      console.log('Error in data fetch', err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));

export const useGetEduJournals = create((set, get) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.get('http://localhost:8080/edujournals');
      set({ ...initialState, success: true, data: res.data });
      console.log(res.data);
    } catch (err) {
      console.log('Error in data fetch', err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));

export const useGetClasses = create((set, get) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.get('http://localhost:8080/classes');
      set({ ...initialState, success: true, data: res.data });
      console.log(res.data);
    } catch (err) {
      console.log('Error in data fetch', err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
