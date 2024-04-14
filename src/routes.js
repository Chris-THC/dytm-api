import { Router } from "express";
import { downloadTrack } from "./downloader/tracks.js";

const routerApi = Router();

routerApi.post("/:videoId", downloadTrack);

export default routerApi;
