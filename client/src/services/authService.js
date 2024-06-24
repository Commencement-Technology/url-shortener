const API_URL = "http://localhost:5000";

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const register = async (username, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const getUser = async (token) => {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export default {
  login,
  register,
  getUser,
};
