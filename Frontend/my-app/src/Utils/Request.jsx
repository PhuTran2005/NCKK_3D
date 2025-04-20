const API_DOMAIN = "https://version-web-3d-64-5.onrender.com/api/v1/";

const Request = async (url, method = "GET", body = null, options = {}) => {
  console.log(API_DOMAIN + url);

  try {
    const response = await fetch(API_DOMAIN + url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: body && method !== "GET" ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Export các hàm gọi API
export const Get = (url, options) => Request(url, "GET", null, options);
export const Post = (url, body, options) => Request(url, "POST", body, options);
export const Patch = (url, body, options) =>
  Request(url, "PATCH", body, options);
export const Delete = (url, options) => Request(url, "DELETE", null, options);
