import { defineStore } from "pinia";
import axios from "axios";

export const useLoginStore = defineStore("login", {
  state: () => ({
    logged: false,
    error: false,
    login: true,
  }),
  actions: {
    async verifyInfo(username, password) {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/token/", {
          username,
          password,
        });
        localStorage.setItem("access", res.data.access);
        this.logged = true;
        this.error = false;
      } catch {
        this.error = true;
      }
    },
    async sendCode(email, username) {
      try {
        await axios.post("http://127.0.0.1:8000/api/send-code/", {
          email,
          username,
        });
        return { success: true };
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return {
            success: false,
            field: err.response?.data?.field,
            message: err.response?.data?.message,
          };
        }
        return { success: false, field: null, message: "Xatolik yuz berdi" };
      }
    },

    async registerUser(username, email, password, code) {
      try {
        await axios.post("http://127.0.0.1:8000/api/verify-register/", {
          username,
          email,
          password,
          code,
        });
        this.logged = true;
        this.error = false;
        return true;
      } catch {
        this.error = true;
        return false;
      }
    },
    logout() {
      localStorage.removeItem("access");
      this.logged = false;
      this.login = true;
    },
  },
  persist: true,
});
