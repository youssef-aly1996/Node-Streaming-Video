const express = require("express");
const cors = require("cors");
const { router } = require("./controllers/videoController");

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use("/videos", router);

app.listen(port, () => {
  console.log("up and listening");
});
