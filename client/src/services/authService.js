import api from "./api.js";

export const authService = {
  login: async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },

  getMe: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const { data } = await api.put("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return data;
  },

  forgotPassword: async (email) => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  },

  resetPassword: async (token, password) => {
    const { data } = await api.put(`/auth/reset-password/${token}`, {
      password,
    });
    return data;
  },
};
