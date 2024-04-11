import axios from "axios";
import ytdl from "ytdl-core";
import contentDisposition from "content-disposition";
import NodeID3 from "node-id3";
import ffmpeg from "fluent-ffmpeg";
import ffmpeg_path from "ffmpeg-static";

export const downloadTrackGet = async (req, res) => {
  try {
    res.setHeader(
      "Content-disposition",
      contentDisposition(`${req.query.artist} - ${req.query.title}.mp3`)
    );
    res.setHeader("Content-Type", "audio/mpeg");

    const albCover = await axios.get(req.query.cover, {
      responseType: "arraybuffer",
    });

    const tags = {
      title: req.query.title,
      artist: req.query.artist,
      album: req.query.album,
      year: req.query.year,
      trackNumber: req.query.track,
      image: {
        imageBuffer: Buffer.from(albCover.data, "utf-8"),
      },
    };

    console.log(`
      Title: ${req.query.title},
      artist: ${req.query.artist},
      album: ${req.query.album},
      year: ${req.query.year},
      trackNumber: ${req.query.track},
      cover: ${req.query.cover}
      `);

    const stream = ytdl(req.params.videoId, {
      quality: "highestaudio",
    });

    const song = [];

    ffmpeg(stream)
      .setFfmpegPath(ffmpeg_path)
      .toFormat("mp3")
      .pipe()
      .on("data", (chunk) => {
        song.push(chunk);
      })
      .on("error", (err) => {
        console.error(`Stream failed to process => ${err}`);
      })
      .on("end", () => {
        NodeID3.write(tags, Buffer.concat(song), (err, taggedBuffer) => {
          if (err) {
            console.error(`Failed to add tags to song => ${err}`);
          } else {
            res.end(taggedBuffer);
            console.log(
              `File ' ${req.query.title} - ${req.query.artist}.mp3' sent!`
            );
          }
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong while trying download track",
    });
  }
};
