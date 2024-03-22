require("dotenv").config();

const cors = require("cors");
const express = require("express");

const axios = require("axios");
const app = express();
const db = require("./db");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/dataOptions", (req, res) => {
  res.json(db);
});

app.post("/getRoute", async (req, res) => {
  try {
    const { ship, port } = req.body;
    let data = await fetchSeaRouteApi(ship, port);
    const route = data?.features[0]?.geometry?.coordinates; //Note: seaRoutes data is lng-lat
    const { distance, duration, departure, arrival } = data?.properties;

    const response = {
      route,
      routeInfo: {
        distance,
        duration,
        departure,
        arrival,
      },
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const fetchSeaRouteApi = async (ship, port) => {
  const headers = {
    accept: "application/json",
    "x-api-key": process.env.SEAROUTE_KEY,
  };

  try {
    const route = `${ship.lng},${ship.lat};${port.lng},${port.lat}`;
    const response = await axios.get(
      `https://api.searoutes.com/route/v2/sea/${route}`,
      { headers }
    );
    const data = response.data;

    return data;
  } catch (err) {
    throw new Error("something went wrong fetching the searoutes Api");
  }
};
