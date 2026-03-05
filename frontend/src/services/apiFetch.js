const API_URL = `http://localhost:5000`;

export const apiFetch = async (
  url,
  getAccessToken,
  refreshAccessToken,
  options = {}
) => {

  let token = getAccessToken();
  const makeRequest = async (token) => {

    return fetch(`${API_URL}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
    });
  };

  let res = await makeRequest(token);

  if (res.status === 401 && refreshAccessToken) {
    token = await refreshAccessToken();
    res = await makeRequest(token); 
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};