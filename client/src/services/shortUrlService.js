const BASE_URL = "http://localhost:5000";

const fetchShortUrls = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/shortUrls`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch short URLs");
  }
  return response.json();
};

const createShortUrl = async (fullUrl) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-token"] = token;
  }

  const response = await fetch(`${BASE_URL}/shortUrls`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ fullUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to create short URL");
  }

  return response.json();
};

const fetchFullUrl = async (shortUrl) => {
  const response = await fetch(`${BASE_URL}/${shortUrl}`);
  if (!response.ok) {
    throw new Error("Failed to fetch the full URL");
  }
  return response.json();
};

export { fetchShortUrls, createShortUrl, fetchFullUrl };
