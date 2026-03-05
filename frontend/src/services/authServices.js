import { apiFetch } from "./apiFetch";

export const login = async (formData) => {
  try {
    const res = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const { data } = res;

    const { accessToken } = data;

    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signup = async (formData) => {
  try {
    const res = await apiFetch("/signup", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const { data } = res;

    const { accessToken } = data;

    return accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const logout = async () => {
  try {
    const res = await apiFetch("/logout", {
      method: "POST",
    });

    const { message } = res;

    return message;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const sendCode = async (code) => {
  try {
    const res = await apiFetch("/verify", {
      method: "POST",
      body: JSON.stringify({ code: code }),
    });

    console.log(res);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
};

