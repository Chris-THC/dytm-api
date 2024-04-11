import { Router } from "express";
import { downloadTrack } from "./downloader/tracks.js";
import { downloadTrackGet } from "./downloader/tracksGet.js";

const routerApi = Router();

// routerApi.post("/:videoId", downloadTrack);
routerApi.get("/:videoId", downloadTrackGet);

export default routerApi;
