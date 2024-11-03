import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import {getManagementToken} from "./utils/mnmt_token.js";
const app = express();

dotenv.config();

const port = process.env.PORT;


app.use(express.json());
app.use(cors());

// health check
app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.patch("/updateMetadata", async (req, res) => {
  const { userId, userMetadata } = req.body;

  const token = await getManagementToken();

  try {
    const response = await axios({
      method: "PATCH",
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/auth0|${userId}`,
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      data: { user_metadata: userMetadata },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
