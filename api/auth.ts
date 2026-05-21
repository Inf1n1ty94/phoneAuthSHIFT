import axios from "axios";

const api = axios.create({
  baseURL: "https://juniorsbootcamp.ru/api",
});

export const requestOtp = async (phone: string) => {
  return api.post("auth/otp", { phone });
};

export const signIn = async (phone: string, code: string) => {
  return api.post("users/signin", { phone, code: Number(code) });
};
