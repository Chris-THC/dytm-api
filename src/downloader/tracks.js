import axios from "axios";
import ytdl from "ytdl-core";
import contentDisposition from "content-disposition";
import NodeID3 from "node-id3";
import ffmpeg from "fluent-ffmpeg";
import ffmpeg_path from "ffmpeg-static";

export const downloadTrack = async (req, res) => {
  try {
    const {
      titleTrack,
      artistTrack,
      albumTrack,
      yearTrack,
      trackNumber,
      albumImg,
    } = req.body;
    res.setHeader(
      "Content-disposition",
      contentDisposition(`${titleTrack} - ${artistTrack}.mp3`)
    );
    res.setHeader("Content-Type", "audio/mpeg");

    let albCover = await axios.get(albumImg, {
      responseType: "arraybuffer",
    });

    let tags = {
      title: titleTrack,
      artist: artistTrack,
      album: albumTrack,
      year: yearTrack,
      trackNumber: trackNumber,
      image: {
        imageBuffer: Buffer.from(albCover.data, "utf-8"),
      },
    };

    console.log(`
    title: ${titleTrack},
    artist: ${artistTrack},
    album: ${albumTrack},
    year: ${yearTrack},
    trackNumber: ${trackNumber},
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
            console.log(`File '${titleTrack} - ${artistTrack}.mp3' sent!`);
          }
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong while trying download track",
    });
  }
};
