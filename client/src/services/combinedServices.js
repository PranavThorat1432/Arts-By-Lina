import api from "./api.js";

export const bookingService = {
  create: async (bookingData) => {
    const { data } = await api.post("/bookings", bookingData);
    return data;
  },
  getAll: async (status) => {
    const params = status ? { status } : {};
    const { data } = await api.get("/bookings", { params });
    return data;
  },
  getById: async (id) => {
    const { data } = await api.get(`/bookings/${id}`);
    return data;
  },
  getStats: async () => {
    const { data } = await api.get("/bookings/stats");
    return data;
  },
  updateStatus: async (id, status) => {
    const { data } = await api.put(`/bookings/${id}`, { status });
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/bookings/${id}`);
    return data;
  },
};

export const contactService = {
  create: async (contactData) => {
    const { data } = await api.post("/contacts", contactData);
    return data;
  },
  getAll: async () => {
    const { data } = await api.get("/contacts");
    return data;
  },
  getById: async (id) => {
    const { data } = await api.get(`/contacts/${id}`);
    return data;
  },
  getStats: async () => {
    const { data } = await api.get("/contacts/stats");
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/contacts/${id}`);
    return data;
  },
};

export const testimonialService = {
  create: async (testimonialData) => {
    const { data } = await api.post("/testimonials", testimonialData);
    return data;
  },
  getApproved: async () => {
    const { data } = await api.get("/testimonials");
    return data;
  },
  getAll: async (status) => {
    const params = status ? { status } : {};
    const { data } = await api.get("/testimonials/all", { params });
    return data;
  },
  getStats: async () => {
    const { data } = await api.get("/testimonials/stats");
    return data;
  },
  updateStatus: async (id, status) => {
    const { data } = await api.put(`/testimonials/${id}`, { status });
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/testimonials/${id}`);
    return data;
  },
};

export const serviceService = {
  getAll: async () => {
    const { data } = await api.get("/services");
    return data;
  },
  getById: async (id) => {
    const { data } = await api.get(`/services/${id}`);
    return data;
  },
  create: async (formData) => {
    const { data } = await api.post("/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
  update: async (id, formData) => {
    const { data } = await api.put(`/services/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/services/${id}`);
    return data;
  },
};

export const settingsService = {
  get: async () => {
    const { data } = await api.get("/settings");
    return data;
  },
  update: async (settingsData) => {
    const { data } = await api.put("/settings", settingsData);
    return data;
  },
};
