export const login = async (formData) => {
  try {
    console.log(formData)
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    const { data } = await res.json();

    const { accessToken } = data.data;

    return accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signup = async (formData) => {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    const { data } = await res.json();

    const { accessToken } = data.data;

    return accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const logout = async () => {
  try {
    const res = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const { message } = res.json;

    return message;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const sendCode = async (code) => {
  try {
    const res = await fetch("http://localhost:5000/verify", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ code: code }),
    });

    const { message } = await res.json();

    console.log(message);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
};

