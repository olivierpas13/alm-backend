import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

export const getManagementToken = async () => {
  const options = {
    method: "POST",
    url:`https://${process.env.AUTH0_DOMAIN}/oauth/token`, 
    headers: { "content-type": "application/json" },
    data: {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Management API token:", error);
  }
};
