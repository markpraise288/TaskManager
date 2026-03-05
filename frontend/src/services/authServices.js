const API_URL = import.meta.env.VITE_API_URL;
export const login = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    const { accessToken } = data.data;

    return accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signup = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    const { accessToken } = data.data;

    return accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();

    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const sendCode = async (code, email) => {
  try {
    const res = await fetch(`${API_URL}/verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: code, email: email }),
    });

    const data = await res.json();

    console.log(data.message);
    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
};

