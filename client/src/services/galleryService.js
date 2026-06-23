import api from "./api.js";

export const galleryService = {
  getAll: async (category) => {
    const params = category && category !== "All" ? { category } : {};
    const { data } = await api.get("/gallery", { params });
    return data;
  },

  getFeatured: async () => {
    const { data } = await api.get("/gallery/featured");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/gallery/${id}`);
    return data;
  },

  create: async (formData) => {
    const { data } = await api.post("/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  update: async (id, formData) => {
    const { data } = await api.put(`/gallery/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deleteImage: async (id, publicId) => {
    const { data } = await api.delete(
      `/gallery/${id}/image/${encodeURIComponent(publicId)}`
    );
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/gallery/${id}`);
    return data;
  },
};
