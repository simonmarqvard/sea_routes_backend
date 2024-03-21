require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

//safeguard if no ship-port is sent
app.post("/getRoute", async (req, res) => {
  const { ship, port } = req.body;

  const data = await fetchSeaRouteApi(ship, port);
  //seaRoutes data is returned as lng-lat
  const route = data.features[0].geometry.coordinates;

  res.json(route);
  //   res.status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const fetchSeaRouteApi = async (ship, port) => {
  const headers = {
    accept: "application/json",
    "x-api-key": process.env.SEAROUTE_KEY,
  };

  const route = `${ship.lng},${ship.lat};${port.lng},${port.lat}`;
  const response = await axios.get(
    `https://api.searoutes.com/route/v2/sea/${route}`,
    { headers }
  );
  const data = response.data;

  return data;
};
