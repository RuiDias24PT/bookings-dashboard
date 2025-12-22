import axios from "axios";
import { fetchWithBackoff } from "../utils/fetchwithBackoff.ts";
//Consider having a file for each domain entity bookingService, supplierService, analyticsService for a larger app
export const apiService = {
  async getBookings() {
    return fetchWithBackoff(() => axios.get("http://localhost:3000/bookings"));
  },

  async getSuppliers() {
    return fetchWithBackoff(() => axios.get("http://localhost:3000/suppliers"));
  },

  async getAnalytics() {
    return fetchWithBackoff(() => axios.get("http://localhost:3000/analytics"));
  },
};
