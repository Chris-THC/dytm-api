import express from "express";
import cors from "cors";
import endpoints from "./routes.js";

const app = express();
const port = 5022;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ytdl", endpoints);

app.use((req, res) => {
  res.status(404).json({
    message:
      "You are on the server but the endpont that you requested don't exist :(",
  });
});

app.listen(port, "0.0.0.0", () => console.log(`Server is running:${port}/`));
