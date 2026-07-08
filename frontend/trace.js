import axios from "axios";

const baseURL = "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

async function trace() {
  console.log("Tracing request to /settings...");
  try {
    const response = await api.get("/settings");
    console.log("=== SUCCESS ===");
    console.log("Request URL:", response.config.baseURL + response.config.url);
    console.log("Method:", response.config.method);
    console.log("Payload:", response.config.data || "None");
    console.log("Status Code:", response.status);
    console.log("Response:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log("=== ERROR ===");
    console.log("Request URL:", error.config?.baseURL + error.config?.url);
    console.log("Method:", error.config?.method);
    console.log("Payload:", error.config?.data || "None");
    if (error.response) {
      console.log("Status Code:", error.response.status);
      console.log("Response:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.log("Status Code: N/A (Network Error or Timeout)");
      console.log("Response: N/A");
    }
    console.log("Error Stack:", error.stack);
  }
}

trace();
